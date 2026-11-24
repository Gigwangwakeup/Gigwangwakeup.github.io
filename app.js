const youtubeId = (url) => (url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];

const link = (href, label) =>
  href ? `<a href="${href}" target="_blank" rel="noopener">${label}</a>` : "";

function videoHtml(work) {
  const id = youtubeId(work.youtube);
  return `<button class="video" type="button" data-video="${id}" aria-label="${work.title} 영상 재생">
    <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">
    <span>영상 재생</span>
  </button>`;
}

function visualHtml(visual) {
  if (visual.type === "clock") {
    const ticks = Array.from({ length: 12 }, (_, i) =>
      `<rect x="98" y="8" width="4" height="14" transform="rotate(${i * 30} 100 100)"/>`).join("");
    return `<div class="clock" role="img" aria-label="현재 시각을 가리키는 아날로그 시계. 프로젝트와 같은 4096스텝 계산을 쓴다.">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="98" class="face"/>
        <g class="ticks">${ticks}</g>
        <rect id="hand-h" class="hand" x="96" y="50" width="8" height="58"/>
        <rect id="hand-m" class="hand" x="97.5" y="26" width="5" height="82"/>
        <rect id="hand-s" class="hand second" x="99" y="16" width="2" height="96"/>
      </svg>
      <dl class="steps">
        <div><dt>시침</dt><dd id="step-h"></dd></div>
        <div><dt>분침</dt><dd id="step-m"></dd></div>
        <div><dt>초침</dt><dd id="step-s"></dd></div>
      </dl>
      <p>지금 시각을 모터 한 바퀴 4096스텝으로 환산한 위치</p>
    </div>`;
  }
  if (visual.type === "lcd") {
    return `<figure class="lcd-wrap">
      <div class="lcd" data-ui role="img" aria-label="16x2 LCD 달력 화면">
        <span id="lcd-1"></span><span id="lcd-2"></span>
      </div>
      <figcaption>달력 모드의 16×2 LCD 화면을 지금 시각으로 재현</figcaption>
    </figure>`;
  }
  const caption = visual.caption ? `<figcaption>${visual.caption}</figcaption>` : "";
  return `<figure><img src="${visual.src}" width="${visual.width}" height="${visual.height}" alt="${visual.alt}" loading="lazy">${caption}</figure>`;
}

function workHtml(work) {
  const stats = (work.stats || [])
    .map(([value, label]) => `<div><dd>${value}</dd><dt>${label}</dt></div>`).join("");
  return `<article class="work ${work.tone ? "work-" + work.tone : ""}">
    <div class="work-inner">
      <div class="work-text">
        <h3>${work.title}</h3>
        <p>${work.summary}</p>
        ${work.role ? `<p class="role">${work.role}</p>` : ""}
        <ul>${work.points.map((point) => `<li>${point}</li>`).join("")}</ul>
        <p class="tags">${work.tags}</p>
        <p class="links">
          ${link(work.github, "코드 보기")}
          ${link(work.team, "팀 저장소")}
          ${link(work.linkedin, "링크드인 글")}
        </p>
      </div>
      <div class="work-media">${work.youtube ? videoHtml(work) : visualHtml(work.visual)}</div>
      ${stats ? `<dl class="stats">${stats}</dl>` : ""}
    </div>
  </article>`;
}

function labHtml({ group, items }) {
  const rows = items.map((item) => `<tr>
    <th scope="row">${item.title}</th>
    <td>${item.text}</td>
    <td>${item.tech}</td>
    <td class="row-links">${link(item.github, "코드")} ${link(item.youtube, "영상")} ${link(item.linkedin, "링크드인")}</td>
  </tr>`).join("");
  return `<h3>${group}</h3>
  <table>
    <thead><tr><th scope="col">이름</th><th scope="col">내용</th><th scope="col">기술</th><th scope="col">링크</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

document.getElementById("works").innerHTML = works.map(workHtml).join("");
document.getElementById("lab-groups").innerHTML = labs.map(labHtml).join("");
// 연락처: 이름과 주소를 함께 보여 준다. 주소를 비워 두면 그 줄은 나오지 않는다.
const shortUrl = (url) => decodeURI(url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const contactRow = (label, href, text) =>
  href ? `<li><span class="contact-label">${label}</span><a href="${href}" target="_blank" rel="noopener">${text}</a></li>` : "";
document.getElementById("contact-links").innerHTML =
  (profile.email ? `<li><span class="contact-label">Email</span><a href="mailto:${profile.email}">${profile.email}</a></li>` : "") +
  contactRow("GitHub", profile.github, shortUrl(profile.github)) +
  contactRow("LinkedIn", profile.linkedin, shortUrl(profile.linkedin)) +
  contactRow("YouTube", profile.youtube, shortUrl(profile.youtube));

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video]");
  if (!button) return;
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`;
  frame.title = button.getAttribute("aria-label");
  frame.allow = "autoplay; encrypted-media; picture-in-picture";
  frame.allowFullscreen = true;
  frame.className = "video-frame";
  button.replaceWith(frame);
});

// 06.analogClock_motor와 같은 계산: 목표 스텝 = 누적 시간 × 4096 ÷ 한 바퀴 시간
const STEPS = 4096;
const pad = (n) => String(n).padStart(2, "0");

function setHand(name, elapsed, period) {
  const step = Math.floor((elapsed * STEPS) / period);
  const hand = document.getElementById("hand-" + name);
  if (!hand) return;
  hand.setAttribute("transform", `rotate(${(step / STEPS) * 360} 100 100)`);
  document.getElementById("step-" + name).textContent = step.toLocaleString("ko-KR");
}

function tick() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  setHand("s", seconds, 60);
  setHand("m", now.getMinutes() * 60 + now.getSeconds(), 3600);
  setHand("h", (now.getHours() % 12) * 3600 + now.getMinutes() * 60 + now.getSeconds(), 43200);

  const line1 = document.getElementById("lcd-1");
  if (!line1) return;
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][now.getDay()];
  line1.textContent = `Time : ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById("lcd-2").textContent =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} [${day}]`;
}

tick();
setInterval(tick, matchMedia("(prefers-reduced-motion: reduce)").matches ? 1000 : 100);

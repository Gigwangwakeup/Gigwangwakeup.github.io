// 사이트 내용은 projects.js에 있고, 이 파일은 그 내용을 화면에 그립니다.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const link = (href, label) => (href ? `<a href="${href}" target="_blank" rel="noopener">${label}</a>` : "");
const youtubeId = (url) => (url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
const shortUrl = (url) => decodeURI(url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const $ = (id) => document.getElementById(id);

// 첫 화면과 특징
const mail = `mailto:${profile.email}?subject=${encodeURIComponent("포트폴리오를 보고 연락드립니다")}`;
$("mail-button").href = mail;
$("contact-mail").href = mail;
$("contact-mail").textContent = profile.email;
$("features").innerHTML = features.map((f) => `<li>${esc(f)}</li>`).join("");
$("interests").textContent = interests;
$("close-meta").textContent = `최종 업데이트 ${profile.updated}`;

// 경력
$("career-company").innerHTML = `<strong>${esc(career.company)}</strong>${esc(career.role)}<br>${esc(career.period)}`;
$("career-rows").innerHTML = career.rows.map(([task, detail]) => `<tr><th scope="row">${esc(task)}</th><td>${esc(detail)}</td></tr>`).join("");

// 설계와 검증 프로젝트
function mediaHtml(w) {
  if (w.youtube) {
    return `<figure><button class="video" type="button" data-video="${youtubeId(w.youtube)}" aria-label="${esc(w.title)} 영상 재생">
      <img src="${w.image.src}" width="${w.image.width}" height="${w.image.height}" alt="${esc(w.image.alt)}" loading="lazy">
      <span>영상 재생</span></button><figcaption>${esc(w.caption)}</figcaption></figure>`;
  }
  return `<figure><img src="${w.image.src}" width="${w.image.width}" height="${w.image.height}" alt="${esc(w.image.alt)}" loading="lazy"><figcaption>${esc(w.caption)}</figcaption></figure>`;
}
$("design-works").innerHTML = designWorks.map((w) => {
  const stats = w.stats.length
    ? `<dl class="stats">${w.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : "";
  return `<article class="work">
    <div class="work-text" data-reveal>
      <h3>${esc(w.title)}</h3>
      <p class="team">${esc(w.team)}</p>
      <p class="summary">${esc(w.summary)}</p>
      <ul>${w.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${stats}
      <p class="tags">${esc(w.tags)}</p>
      <p class="links">${link(w.github, "코드 보기")}${link(w.youtube, "유튜브에서 보기")}</p>
    </div>
    <div class="work-media" data-reveal>${mediaHtml(w)}</div>
  </article>`;
}).join("");

// 보드 사진 프로젝트
const boardPhoto = (b) => {
  const img = `<img src="${b.image.src}" width="${b.image.width}" height="${b.image.height}" alt="${esc(b.image.alt)}" loading="lazy">`;
  return b.youtube
    ? `<div class="photo"><button class="video board-video" type="button" data-video="${youtubeId(b.youtube)}" aria-label="${esc(b.title)} 영상 재생">${img}<span>영상 재생</span></button></div>`
    : `<div class="photo">${img}</div>`;
};
$("board-works").innerHTML = boardWorks.map((b) => `<article class="board" data-reveal>
    ${boardPhoto(b)}
    <h3>${esc(b.title)}</h3>
    <p class="team">${esc(b.team)}</p>
    <p class="text">${esc(b.text)}</p>
    <p class="tags">${esc(b.tags)}</p>
    <p class="links">${link(b.github, "코드 보기")}${link(b.youtube, "유튜브에서 보기")}</p>
  </article>`).join("");

// 실습 기록 표
$("lab-groups").innerHTML = labs.map(({ group, items }) => `<div class="lab-group">
    <h3>${esc(group)}</h3>
    <table class="sheet" data-reveal>
      <thead><tr><th scope="col">이름</th><th scope="col">내용</th><th scope="col">기술</th><th scope="col">링크</th></tr></thead>
      <tbody>${items.map(([name, text, tech, href, video]) => `<tr><th scope="row">${esc(name)}</th><td>${esc(text)}</td><td>${esc(tech)}</td><td class="row-links">${link(href, "코드")}${video ? link(video, "영상") : ""}</td></tr>`).join("")}</tbody>
    </table>
  </div>`).join("");

// 연락처 핀 표
const pins = [
  ["EMAIL", profile.email ? `mailto:${profile.email}` : "", profile.email],
  ["GITHUB", profile.github, profile.github && shortUrl(profile.github)],
  ["LINKEDIN", profile.linkedin, profile.linkedin && shortUrl(profile.linkedin)],
  ["YOUTUBE", profile.youtube, profile.youtube && shortUrl(profile.youtube)],
].filter(([, href]) => href);
$("pin-rows").innerHTML = pins.map(([pin, href, text]) =>
  `<tr><th scope="row">${pin}</th><td><a href="${href}"${href.startsWith("mailto") ? "" : ' target="_blank" rel="noopener"'}>${esc(text)}</a></td></tr>`).join("");

// 영상: 누르면 그 자리에서 재생
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

// 이력 타임라인: 한 줄에 여섯 칸. 지금 하는 칸에 표시.
$("history").innerHTML = history.map((h) => `<li class="step${h.now ? " now" : ""}">
    <span class="dot" aria-hidden="true"></span>
    <p class="when">${esc(h.when)}${h.now ? ' <span class="now-tag">지금</span>' : ""}</p>
    <p class="tag">${esc(h.tag)}</p>
    <h3>${esc(h.title)}</h3>
    <p class="detail">${esc(h.detail)}</p>
  </li>`).join("");

// 등장 움직임
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-reveal]").forEach((el) => {
  if (el.tagName === "TABLE" || el.classList.contains("board")) el.classList.add("solo");
});
// 화면 아래쪽 8% 선을 넘은 요소는 보이게 합니다. 빠르게 지나쳐도 빠지지 않도록 위치로 판단합니다.
let pending = [...document.querySelectorAll("[data-reveal]")];
let ticking = false;
function reveal() {
  ticking = false;
  const line = innerHeight * 0.92;
  pending = pending.filter((el) => {
    if (el.getBoundingClientRect().top > line) return true;
    el.classList.add("in");
    return false;
  });
  if (!pending.length) removeEventListener("scroll", onScroll);
}
function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(reveal); }
}
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onScroll);
reveal();
// 첫 화면 등장: 끝난 요소는 is-in으로 고정하고, 애니메이션이 돌지 않는 환경이면 바로 보이게 합니다.
const appears = [...document.querySelectorAll(".appear")];
appears.forEach((el) => el.addEventListener("animationend", () => el.classList.add("is-in"), { once: true }));
requestAnimationFrame(() => requestAnimationFrame(() => {
  appears.forEach((el) => {
    const running = el.getAnimations ? el.getAnimations().some((a) => a.playState === "running" || a.playState === "finished") : false;
    if (!running) el.classList.add("is-in");
  });
}));

// 휴대폰 메뉴
const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
};
burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
document.querySelectorAll("#site-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.querySelector(".menu-backdrop").addEventListener("click", () => setMenu(false));
addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

// 패널이 배경 사진 위로 밀려 올라오는 움직임. 스크롤 위치에 그대로 묶여 있어 되돌리면 다시 내려갑니다.
const panels = [...document.querySelectorAll(".panel")];
const backdrop = document.querySelector(".backdrop");
// 움직임 줄이기 설정이 켜져 있으면 크기 변화 없이 짧게만 올라옵니다.
const TRAVEL = reduce ? 48 : 140, SHRINK = reduce ? 0 : 0.05;
let rising = false;
function rise() {
  rising = false;
  const vh = innerHeight;
  panels.forEach((p) => {
    const top = p.getBoundingClientRect().top;
    const k = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)));
    const e = 1 - Math.pow(1 - k, 3);
    p.style.transform = `translate3d(0, ${((1 - e) * TRAVEL).toFixed(1)}px, 0) scale(${(1 - SHRINK + SHRINK * e).toFixed(4)})`;
  });
  // 첫 화면을 지나면 배경을 조금 어둡게, 조금 가깝게
  const depth = Math.min(1, scrollY / vh);
  backdrop.style.setProperty("--shade", (0.12 + 0.5 * depth).toFixed(3));
  header.classList.toggle("scrolled", scrollY > 40);
}
addEventListener("scroll", () => { if (!rising) { rising = true; requestAnimationFrame(rise); } }, { passive: true });
addEventListener("resize", rise);
rise();
// 탭이 숨겨져 있어 그리기가 멈춘 경우에도 내용이 남지 않도록
setTimeout(() => { if (document.hidden) pending.forEach((el) => el.classList.add("in")); }, 3000);

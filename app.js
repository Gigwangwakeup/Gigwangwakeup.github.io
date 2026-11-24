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
$("board-works").innerHTML = boardWorks.map((b) => `<article class="board" data-reveal>
    <div class="photo"><img src="${b.image.src}" width="${b.image.width}" height="${b.image.height}" alt="${esc(b.image.alt)}" loading="lazy"></div>
    <h3>${esc(b.title)}</h3>
    <p class="team">${esc(b.team)}</p>
    <p class="text">${esc(b.text)}</p>
    <p class="tags">${esc(b.tags)}</p>
    ${b.github ? `<a class="code" href="${b.github}" target="_blank" rel="noopener">코드 보기</a>` : ""}
  </article>`).join("");

// 실습 기록 표
$("lab-groups").innerHTML = labs.map(({ group, items }) => `<div class="lab-group">
    <h3>${esc(group)}</h3>
    <table class="sheet" data-reveal>
      <thead><tr><th scope="col">이름</th><th scope="col">내용</th><th scope="col">기술</th><th scope="col">코드</th></tr></thead>
      <tbody>${items.map(([name, text, tech, href]) => `<tr><th scope="row">${esc(name)}</th><td>${esc(text)}</td><td>${esc(tech)}</td><td>${link(href, "보기")}</td></tr>`).join("")}</tbody>
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

// 타이밍도
const toIndex = (ym) => { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); };
const fromIndex = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 });
const T0 = toIndex(timeline.start);
const N = toIndex(timeline.end) - T0 + 1;
const W = 1000, L = 96, ROW = 48, TOP = 34;
const colW = (W - L) / N;
const x = (i) => L + i * colW;
const rowY = (r) => TOP + r * ROW;
const H = rowY(timeline.rows.length + 1) + 24;
const range = $("wave-range");
range.max = N - 1;
const nowIdx = toIndex(timeline.now) - T0;

function segAt(row, i) {
  return row.segs.filter((s) => i >= toIndex(s.from) - T0 && i <= toIndex(s.to) - T0);
}

function drawWave() {
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="presentation">`;
  // 해마다 1월에 눈금 글자
  for (let i = 0; i < N; i++) {
    const { y, m } = fromIndex(T0 + i);
    if ((m === 1 && i > 3) || i === 0) svg += `<text class="axis" x="${x(i) + 2}" y="${H - 4}">${y}.${String(m).padStart(2, "0")}</text>`;
  }
  // clk: 한 달에 한 주기
  const cy = rowY(0);
  let d = `M${x(0)} ${cy + 14}`;
  for (let i = 0; i < N; i++) {
    d += ` L${x(i)} ${cy - 10} L${x(i) + colW / 2} ${cy - 10} L${x(i) + colW / 2} ${cy + 14} L${x(i + 1)} ${cy + 14}`;
  }
  svg += `<text class="row-name" x="0" y="${cy + 6}">clk</text><path class="clk" d="${d}"/>`;
  // 버스 신호
  timeline.rows.forEach((row, r) => {
    const yc = rowY(r + 1);
    svg += `<text class="row-name" x="0" y="${yc + 6}">${esc(row.name)}</text>`;
    row.segs.forEach((s, k) => {
      const a = x(toIndex(s.from) - T0), b = x(toIndex(s.to) - T0 + 1);
      const e = Math.min(7, (b - a) / 4), t = yc - 15, bt = yc + 15;
      svg += `<polygon class="seg" data-row="${r}" data-seg="${k}" points="${a},${yc} ${a + e},${t} ${b - e},${t} ${b},${yc} ${b - e},${bt} ${a + e},${bt}"/>`;
      const fits = s.label.length * 14 < b - a - 20;
      if (fits) svg += `<text class="seg-label" x="${a + 14}" y="${yc + 5}">${esc(s.label)}</text>`;
    });
  });
  svg += `<g id="cursor"><line class="cursor" x1="0" x2="0" y1="${TOP - 22}" y2="${rowY(timeline.rows.length) + 20}"/>
    <rect class="cursor-tag" x="-34" y="0" width="68" height="22"/><text class="cursor-text" x="0" y="16" text-anchor="middle"></text></g>`;
  $("wave-plot").innerHTML = svg + "</svg>";
}

function setCursor(i) {
  const cx = x(i) + colW / 2;
  const g = $("cursor");
  g.setAttribute("transform", `translate(${Math.min(Math.max(cx, L + 34), W - 34)} 0)`);
  g.querySelector("line").setAttribute("transform", `translate(${cx - Math.min(Math.max(cx, L + 34), W - 34)} 0)`);
  const { y, m } = fromIndex(T0 + i);
  g.querySelector("text").textContent = `${y}.${String(m).padStart(2, "0")}`;
  document.querySelectorAll(".seg").forEach((p) => {
    const s = timeline.rows[p.dataset.row].segs[p.dataset.seg];
    p.classList.toggle("on", i >= toIndex(s.from) - T0 && i <= toIndex(s.to) - T0);
  });
  const fmt = (ym) => ym.replace("-", ".");
  const rows = timeline.rows.map((row) => {
    const hits = segAt(row, i);
    const v = hits.length ? hits.map((s) => `${fmt(s.from)} ~ ${fmt(s.to)} ${esc(s.label)}`).join("<br>") : "없음";
    return `<div><dt>${esc(row.name)}</dt><dd>${v}</dd></div>`;
  });
  $("wave-readout").innerHTML = `<div><dt>시점</dt><dd>${y}년 ${m}월</dd></div>` + rows.join("");
  range.setAttribute("aria-valuetext", `${y}년 ${m}월`);
}

drawWave();
range.value = nowIdx;
setCursor(nowIdx);
range.addEventListener("input", () => setCursor(Number(range.value)));

// 등장 움직임
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-reveal]").forEach((el) => {
  if (el.tagName === "TABLE" || el.classList.contains("board") || el.classList.contains("wave")) el.classList.add("solo");
});
let swept = false;
function sweep() {
  // 처음 보일 때 커서가 시작점에서 지금까지 훑고 지나갑니다
  if (swept || reduce) return;
  swept = true;
  const start = performance.now(), dur = 1600;
  const step = (t) => {
    const k = Math.min(1, (t - start) / dur);
    const i = Math.round((1 - Math.pow(1 - k, 3)) * nowIdx);
    range.value = i;
    setCursor(i);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
// 화면 아래쪽 8% 선을 넘은 요소는 보이게 합니다. 빠르게 지나쳐도 빠지지 않도록 위치로 판단합니다.
let pending = [...document.querySelectorAll("[data-reveal]")];
let ticking = false;
function reveal() {
  ticking = false;
  const line = innerHeight * 0.92;
  pending = pending.filter((el) => {
    if (el.getBoundingClientRect().top > line) return true;
    el.classList.add("in");
    if (el.classList.contains("wave")) sweep();
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
// 탭이 숨겨져 있어 그리기가 멈춘 경우에도 내용이 남지 않도록
setTimeout(() => { if (document.hidden) pending.forEach((el) => el.classList.add("in")); }, 3000);

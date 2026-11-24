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
// 파형 뷰어 배치. 넓은 화면은 신호 이름, 값 열, 파형 창으로 나누고, 휴대폰은 파형 창만 그립니다.
const range = $("wave-range");
range.max = N - 1;
const nowIdx = toIndex(timeline.now) - T0;
const RULER = 30, ROW = 36;
let G = {};
const fmtYM = (i) => { const { y, m } = fromIndex(T0 + i); return `${y}.${String(m).padStart(2, "0")}`; };
// 글자 폭 어림: 한글은 글자 크기만큼, 나머지는 0.6배
const textW = (s, size) => [...s].reduce((w, c) => w + (/[ㄱ-힝]/.test(c) ? size : size * 0.6), 0);

function segAt(row, i) {
  return row.segs.filter((s) => i >= toIndex(s.from) - T0 && i <= toIndex(s.to) - T0);
}

function layout() {
  const compact = innerWidth < 700;
  const NAMEW = compact ? 0 : 130, VALW = compact ? 0 : 190;
  const W = compact ? 640 : 1240, L = NAMEW + VALW;
  const colW = (W - L - 8) / N;
  G = { compact, NAMEW, VALW, W, L, colW, x: (i) => L + 4 + i * colW, rowC: (r) => RULER + r * ROW + ROW / 2, H: RULER + (timeline.rows.length + 1) * ROW + 6 };
}

function drawWave() {
  layout();
  const { NAMEW, W, L, colW, x, rowC, H, compact } = G;
  const rows = timeline.rows.length + 1;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="presentation">`;
  // 이름과 값 창, 시간 눈금자
  if (!compact) {
    s += `<rect class="pane" x="0" y="0" width="${L}" height="${H}"/>`;
    s += `<text class="head" x="12" y="19">Signal</text><text class="head" x="${NAMEW + 12}" y="19">Value @ cursor</text>`;
    s += `<line class="pane-edge" x1="${NAMEW}" y1="0" x2="${NAMEW}" y2="${H}"/><line class="pane-edge" x1="${L}" y1="0" x2="${L}" y2="${H}"/>`;
  }
  s += `<rect class="ruler" x="${L}" y="0" width="${W - L}" height="${RULER}"/>`;
  for (let i = 0; i <= N; i++) {
    const { m } = fromIndex(T0 + i);
    const major = m === 1;
    s += `<line class="tick${major ? " major" : ""}" x1="${x(i)}" y1="${RULER - (major ? 12 : 5)}" x2="${x(i)}" y2="${RULER}"/>`;
    if (major) {
      s += `<line class="grid" x1="${x(i)}" y1="${RULER}" x2="${x(i)}" y2="${H}"/>`;
      s += `<text class="axis" x="${x(i) + 4}" y="14">${fromIndex(T0 + i).y}</text>`;
    }
  }
  // 시작 달 글자는 첫 해 눈금과 겹치지 않을 만큼 떨어져 있을 때만
  if (fromIndex(T0).m <= 9) s += `<text class="axis" x="${x(0) + 4}" y="14">${fmtYM(0)}</text>`;
  for (let r = 1; r < rows; r++) s += `<line class="row-sep" x1="0" y1="${RULER + r * ROW}" x2="${W}" y2="${RULER + r * ROW}"/>`;

  // clk: 한 달에 한 주기
  const c0 = rowC(0), hi = c0 - 9, lo = c0 + 9;
  let d = `M${x(0)} ${lo}`;
  for (let i = 0; i < N; i++) d += ` L${x(i)} ${hi} L${x(i) + colW / 2} ${hi} L${x(i) + colW / 2} ${lo} L${x(i + 1)} ${lo}`;
  s += `<path class="clk" d="${d}"/>`;
  if (!compact) s += `<text class="sig" x="12" y="${c0 + 4}">clk</text>`;

  // 버스 신호: 값이 있는 구간은 육각형, 없는 구간은 가운데 선(z)
  timeline.rows.forEach((row, r) => {
    const yc = rowC(r + 1), t = yc - 10, b2 = yc + 10;
    if (!compact) {
      s += `<text class="sig" x="12" y="${yc + 4}">${esc(row.signal)}</text>`;
      s += `<text class="val" id="val-${r}" x="${NAMEW + 12}" y="${yc + 4}"></text>`;
    }
    const spans = row.segs.map((g) => [toIndex(g.from) - T0, toIndex(g.to) - T0 + 1]).sort((p, q) => p[0] - q[0]);
    let cur = 0;
    spans.forEach(([a, b]) => { if (a > cur) s += `<line class="idle" x1="${x(cur)}" y1="${yc}" x2="${x(a)}" y2="${yc}"/>`; cur = Math.max(cur, b); });
    if (cur < N) s += `<line class="idle" x1="${x(cur)}" y1="${yc}" x2="${x(N)}" y2="${yc}"/>`;
    row.segs.forEach((g, k) => {
      const a = x(toIndex(g.from) - T0), b = x(toIndex(g.to) - T0 + 1), e = Math.min(5, (b - a) / 4);
      s += `<polygon class="seg" data-row="${r}" data-seg="${k}" points="${a},${yc} ${a + e},${t} ${b - e},${t} ${b},${yc} ${b - e},${b2} ${a + e},${b2}"/>`;
      if (textW(g.short, 12) < b - a - 14) s += `<text class="seg-label" x="${a + 9}" y="${yc + 4}">${esc(g.short)}</text>`;
    });
  });

  s += `<g id="cursor"><line class="cursor" x1="0" x2="0" y1="${RULER}" y2="${H}"/>
    <rect class="cursor-tag" x="-30" y="7" width="60" height="18"/><text class="cursor-text" x="0" y="20" text-anchor="middle"></text></g>`;
  $("wave-plot").innerHTML = s + "</svg>";
}

function setCursor(i) {
  const { x, colW, L, W } = G;
  const cx = x(i) + colW / 2;
  const tagX = Math.min(Math.max(cx, L + 32), W - 32);
  const g = $("cursor");
  g.querySelector("line").setAttribute("transform", `translate(${cx} 0)`);
  g.querySelector("rect").setAttribute("transform", `translate(${tagX} 0)`);
  const label = g.querySelector("text");
  label.setAttribute("transform", `translate(${tagX} 0)`);
  label.textContent = fmtYM(i);
  document.querySelectorAll(".seg").forEach((p) => {
    const sg = timeline.rows[p.dataset.row].segs[p.dataset.seg];
    p.classList.toggle("on", i >= toIndex(sg.from) - T0 && i <= toIndex(sg.to) - T0);
  });
  const fmt = (ym) => ym.replace("-", ".");
  timeline.rows.forEach((row, r) => {
    const v = $(`val-${r}`);
    if (v) v.textContent = segAt(row, i).map((sg) => sg.short).join(", ") || "z";
  });
  const { y, m } = fromIndex(T0 + i);
  $("wave-time").textContent = fmtYM(i);
  $("wave-readout").innerHTML = timeline.rows.map((row) => {
    const hits = segAt(row, i);
    const v = hits.length ? hits.map((sg) => `${fmt(sg.from)} ~ ${fmt(sg.to)} ${esc(sg.label)}`).join("<br>") : "z (값 없음)";
    return `<div><dt>${esc(row.signal)}</dt><dd>${v}</dd></div>`;
  }).join("");
  range.setAttribute("aria-valuetext", `${y}년 ${m}월`);
}

drawWave();
range.value = nowIdx;
setCursor(nowIdx);
range.addEventListener("input", () => setCursor(Number(range.value)));
matchMedia("(max-width: 699px)").addEventListener("change", () => { drawWave(); setCursor(Number(range.value)); });

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
  backdrop.style.setProperty("--shade", (0.35 + 0.4 * depth).toFixed(3));
  if (!reduce) backdrop.style.transform = `scale(${(1 + 0.08 * depth).toFixed(4)})`;
}
addEventListener("scroll", () => { if (!rising) { rising = true; requestAnimationFrame(rise); } }, { passive: true });
addEventListener("resize", rise);
rise();
// 탭이 숨겨져 있어 그리기가 멈춘 경우에도 내용이 남지 않도록
setTimeout(() => { if (document.hidden) pending.forEach((el) => el.classList.add("in")); }, 3000);

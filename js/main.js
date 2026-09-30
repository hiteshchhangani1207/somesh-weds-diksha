(() => {
  "use strict";
  const W = window.WEDDING;
  // Every visit starts at darshan, even on reload
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  addEventListener("load", () => { if (document.body.classList.contains("locked")) window.scrollTo(0, 0); });
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), W);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => innerWidth < 760;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const slot = (src, alt = "") => (src ? `<img class="slot" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : "");
  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  /* ---------- Mor pankh: a finely drawn peacock feather ---------- */
  (function buildFeather() {
    const r = rng(12);
    let low = "", high = "";
    for (let y = 334; y > 150; y -= 4.5) {
      const t = (334 - y) / 184, len = 8 + 28 * t;
      for (const s of [-1, 1]) {
        const ex = 50 + s * len * (0.85 + r() * 0.3), ey = y - 12 - len * 0.4;
        low += `<path d="M50 ${y.toFixed(1)}Q${(50 + s * len * 0.45).toFixed(1)} ${(y - 3).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" opacity="${(0.3 + 0.55 * t).toFixed(2)}"/>`;
      }
    }
    for (let y = 152; y > 16; y -= 2) {
      const t = (152 - y) / 136, env = Math.sin(Math.PI * Math.min(1, 0.12 + t * 0.95));
      const len = 12 + 30 * env;
      for (const s of [-1, 1]) {
        const ex = 50 + s * len, ey = y - 10 - len * 0.32;
        high += `<path d="M50 ${y.toFixed(1)}Q${(50 + s * len * 0.5).toFixed(1)} ${(y - 2).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`;
      }
    }
    $("#feather-defs").innerHTML = `<defs>
      <linearGradient id="fb-low" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f9a52"/><stop offset="1" stop-color="#c8c27a"/></linearGradient>
      <linearGradient id="fb-high" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f9a6c"/><stop offset=".6" stop-color="#1d7a62"/><stop offset="1" stop-color="#8fbf62"/></linearGradient>
      <linearGradient id="f-rachis" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e9dca8"/><stop offset="1" stop-color="#b9a45a"/></linearGradient>
      <radialGradient id="f-e1" cx=".5" cy=".55" r=".6"><stop offset=".6" stop-color="#b98a2e"/><stop offset=".85" stop-color="#e2c064"/><stop offset="1" stop-color="#7d8a3c" stop-opacity=".2"/></radialGradient>
      <radialGradient id="f-e3" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#2cc6c9"/><stop offset="1" stop-color="#128a96"/></radialGradient>
      <radialGradient id="f-e4" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#2f5fd0"/><stop offset="1" stop-color="#0f2a82"/></radialGradient>
      <symbol id="feather" viewBox="0 0 100 360">
        <g fill="none" stroke="url(#fb-low)" stroke-width=".7" stroke-linecap="round">${low}</g>
        <g fill="none" stroke="url(#fb-high)" stroke-width=".85" stroke-linecap="round">${high}</g>
        <path d="M50 356C49 300 50 180 50 26" stroke="url(#f-rachis)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="80" rx="27" ry="33" fill="url(#f-e1)"/>
        <ellipse cx="50" cy="82" rx="21" ry="26" fill="#2e9b64"/>
        <ellipse cx="50" cy="84" rx="16" ry="20" fill="url(#f-e3)"/>
        <path d="M50 70C60 72 62 88 55 97C53 100 51 102 50 104C49 102 47 100 45 97C38 88 40 72 50 70Z" fill="url(#f-e4)"/>
        <ellipse cx="50" cy="89" rx="5" ry="7" fill="#06154a"/>
        <ellipse cx="44.5" cy="78" rx="2.6" ry="4.5" fill="#fff" opacity=".28"/>
      </symbol></defs>`;
  })();

  /* ---------- Guest groups (?g=) and greeting (?to=) ---------- */
  const params = new URLSearchParams(location.search);
  const groupIds = W.guestGroups[params.get("g")];
  const allowed = groupIds ? new Set(groupIds) : null;
  const days = W.days
    .map((d) => ({ ...d, events: d.events.filter((e) => !allowed || allowed.has(e.id)) }))
    .filter((d) => d.events.length);
  const events = days.flatMap((d) => d.events);
  const guest = params.get("to");
  if (guest) { const g = $("#greeting"); g.textContent = `Dear ${guest},`; g.hidden = false; }

  const surname = (n) => n.split(" ").slice(-1)[0];
  $$("[data-bind]").forEach((el) => (el.textContent = get(el.dataset.bind) ?? ""));
  document.title = `${W.groom.firstName} weds ${W.bride.firstName}`;
  $("#seal-mono").innerHTML = esc(W.monogram).replace(/&amp;/, "<i>&amp;</i>");
  $("#gate-families").textContent = `The ${surname(W.groom.fullName)} & ${surname(W.bride.fullName)} families`;

  const fmtDay = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  };

  /* ---------- Paper texture ---------- */
  const hex = (h) => [1, 3, 5].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3));
  function paperURI(seed, base) {
    const [dr, dg, db] = hex("#c9a36a"), [lr, lg, lb] = hex("#fffaf0");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'>
<filter id='a' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.0032' numOctaves='5' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${dr} 0 0 0 0 ${dg} 0 0 0 0 ${db} 1.1 0 0 0 -.52'/></filter>
<filter id='b' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.011' numOctaves='4' seed='${seed + 7}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${lr} 0 0 0 0 ${lg} 0 0 0 0 ${lb} 0 1.8 0 0 -.8'/></filter>
<filter id='c' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2' seed='${seed + 3}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .4 0 0 0 0 .3 0 0 .3 0 -.1'/></filter>
<rect width='100%' height='100%' fill='${base}'/><rect width='100%' height='100%' filter='url(#a)'/><rect width='100%' height='100%' filter='url(#b)'/><rect width='100%' height='100%' filter='url(#c)'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  const PAPER = { invite: "#f4eee4", families: "#eee2dc" };
  $$(".paper").forEach((el, i) => (el.style.backgroundImage = paperURI(3 + i, PAPER[el.id] || "#f6f0e6")));
  $(".paperfx").style.backgroundImage = paperURI(21, "#fdf9f1");

  // Torn deckle edges: every sheet after the first has a hand-torn top edge,
  // with a fine pale rim where the paper fibres show
  function tearLine(seed) {
    const r = rng(seed), pts = [];
    let drift = 0;
    for (let x = 0; x <= 1000; x += 3) {
      drift += (r() - 0.5) * 2.2; drift *= 0.93;
      pts.push([x, 24 + Math.sin(x / 71 + seed) * 7 + Math.sin(x / 23 + seed * 3) * 2.5 + drift + (r() - 0.5) * 2.4]);
    }
    return pts.map(([x, y]) => `L${x} ${Math.max(6, Math.min(40, y)).toFixed(1)}`).join("");
  }
  const svgURI = (inner) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 46' preserveAspectRatio='none'>${inner}</svg>`).replace(/'/g, "%27")}")`;
  $$(".sheet").forEach((sec, i) => {
    sec.style.zIndex = i + 1;
    if (!i) return;
    const line = tearLine(11 + i * 7);
    sec.style.setProperty("--tear", svgURI(`<path d='M0 46${line}L1000 46Z'/>`));
    sec.insertAdjacentHTML("afterbegin", `<div class="tear-rim" aria-hidden="true" style="background-image:${svgURI(`<path d='M0 24${line}' fill='none' stroke='#fbf8f2' stroke-width='5' stroke-linejoin='round' vector-effect='non-scaling-stroke'/><path d='M0 27${line}' transform='translate(0 3)' fill='none' stroke='rgba(120,98,76,.18)' stroke-width='1.2' vector-effect='non-scaling-stroke'/>`).replace(/"/g, "'")}"></div>`);
  });

  /* ---------- Gold arch ornament ---------- */
  function archD(x, y, w, h) {
    const X = (v) => (x + v * w).toFixed(1), Y = (v) => (y + v * h).toFixed(1);
    return `M${X(0)} ${Y(1)}V${Y(0.36)}C${X(0)} ${Y(0.2)} ${X(0.22)} ${Y(0.1)} ${X(0.36)} ${Y(0.07)}C${X(0.43)} ${Y(0.055)} ${X(0.47)} ${Y(0.03)} ${X(0.5)} ${Y(0)}C${X(0.53)} ${Y(0.03)} ${X(0.57)} ${Y(0.055)} ${X(0.64)} ${Y(0.07)}C${X(0.78)} ${Y(0.1)} ${X(1)} ${Y(0.2)} ${X(1)} ${Y(0.36)}V${Y(1)}`;
  }
  const ornInner = () => `
      <g fill="none" stroke="url(#g-gold)" stroke-linecap="round">
        <path class="draw" pathLength="1" stroke-width="1.8" d="${archD(8, 9, 184, 241)}"/>
        <path class="draw" pathLength="1" stroke-width=".8" d="${archD(13, 15, 174, 235)}"/>
        <path class="draw" pathLength="1" stroke-width="1.8" d="M0 250H200"/>
      </g>
      <g class="orn-fill"><use href="#lotus" x="82" y="-22" width="36" height="22" style="color:#c9a45c"/></g>`;
  $("#deity-orn").innerHTML = ornInner();

  /* ---------- Content ---------- */
  $("#intro").textContent = W.introLines[0];
  $("#gita-sa").innerHTML = W.shloka.sanskrit.map((l) => `<p>${esc(l)}</p>`).join("");
  $("#gita-en").textContent = `“${W.shloka.english}”`;

  // The main ceremonies as cards; the full schedule waits behind one tap
  const where = (d) => `${d.venue.split(" · ")[0]}, ${d.place}`;
  let keys = days.flatMap((d) => d.events.filter((e) => e.key).map((e) => ({ d, e })));
  if (!keys.length) keys = days.flatMap((d) => d.events.map((e) => ({ d, e })));
  const dd = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  $("#key-events").innerHTML = keys.map(({ d, e }) => `
    <li class="event${e.highlight ? " highlight" : ""}">
      <p class="ev-date"><b>${dd(d.date).getDate()}</b><span>${dd(d.date).toLocaleDateString("en-IN", { month: "short" })}</span></p>
      <div>
        <p class="ev-hi">${esc(e.hindi)}</p>
        <h3 class="ev-name">${esc(e.name)}</h3>
        <p class="ev-meta">${esc(dd(d.date).toLocaleDateString("en-IN", { weekday: "long" }))} · ${esc(e.time)}</p>
        <p class="ev-where">${esc(where(d))}</p>
        <a class="ev-route" href="${esc(d.mapUrl)}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-pin"/></svg>Directions</a>
      </div>
    </li>`).join("");
  $("#key-events").insertAdjacentHTML("afterbegin", '<span class="ev-line" aria-hidden="true"></span>');
  if (events.length <= keys.length) $(".full-wrap").remove();
  else $("#schedule").innerHTML = days.map((d) => `
    <div class="sch-day">
      <p class="sch-head"><span>${esc(fmtDay(d.date))} · ${esc(d.place)}</span><a href="${esc(d.mapUrl)}" target="_blank" rel="noopener">Route</a></p>
      ${d.events.map((e) => `<div class="sch-row${e.highlight ? " highlight" : ""}"><span class="t">${esc(e.time)}</span><span class="n">${esc(e.name)}</span></div>`).join("")}
      <p class="sch-venue">${esc(d.venue)}</p>
    </div>`).join("");

  // A faint repeat of gold lotus outlines behind the bride & groom
  if ($(".cp-pattern")) $(".cp-pattern").style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='#e8dcc3' stroke-width='1' stroke-linecap='round'><path d='M60 30C66 40 66 52 60 62C54 52 54 40 60 30Z'/><path d='M60 62C51 59 45 51 44 40C52 44 58 52 60 62Z'/><path d='M60 62C69 59 75 51 76 40C68 44 62 52 60 62Z'/><path d='M44 66Q60 71 76 66'/></g></svg>`)}")`;

  // Save the date: the Panigrahan, 11 December 2026 at 6:30 PM (IST), straight into the calendar.
  // iPhone/iPad open the Calendar "Add event" sheet; everything else opens Google Calendar.
  const saveTheDate = () => {
    const d4 = W.days.find((d) => d.events.some((e) => e.id === "panigrahan")) || W.days[W.days.length - 1];
    const title = `Panigrahan Sanskar · ${W.groom.firstName} & ${W.bride.firstName}`;
    const where = d4.venue.replace(" · ", ", ");
    const start = "20261211T130000Z", end = "20261211T170000Z"; // 6:30 PM to 10:30 PM IST
    const details = `With the blessings of Shri Radha Krishna, the ${W.familyName} family invites you. Directions: ${d4.mapUrl}`;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (iOS) {
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Somesh weds Diksha//EN", "BEGIN:VEVENT", "UID:panigrahan-20261211@someshwedsdiksha",
        `DTSTAMP:${start}`, `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${title}`, `LOCATION:${where.replace(/,/g, "\\,")}`,
        `DESCRIPTION:${details.replace(/,/g, "\\,")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      location.href = "data:text/calendar;charset=utf8," + encodeURIComponent(ics);
    } else {
      const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${start}/${end}`, location: where, details });
      window.open("https://calendar.google.com/calendar/render?" + q.toString(), "_blank", "noopener");
    }
  };
  $("#save-dates") && $("#save-dates").addEventListener("click", saveTheDate);

  $$(".portrait").forEach((f) => {
    const p = W[f.dataset.person];
    f.innerHTML = `<div class="pic"><span class="ini">${esc(p.firstName[0])}</span>${slot(p.photo, p.fullName)}</div>
      <svg class="ev-orn" viewBox="0 0 200 250" aria-hidden="true">${ornInner()}</svg>
      <figcaption>${esc(p.firstName)}</figcaption>`;
  });

  // Families: a short sign-off; the whole family waits behind "Our family"
  const F = W.families;
  const list = (arr) => `<ul>${arr.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
  $("#sign-who").textContent = F.signOff;
  $("#fam-lines").innerHTML = `
    <p data-reveal><b>Eager for your darshan</b>${esc(F.darshanabhilashi)}</p>
    <p data-reveal><b>With a sweet request</b>${esc(F.manuhar)}</p>`;
  $("#fam-full").innerHTML = `
    <div class="fam-block"><h3><span class="deva">विनीत</span>With folded hands</h3>${list(F.vineet)}</div>
    <div class="fam-block"><h3><span class="deva">मामा का आंगन</span>Maternal uncles ${esc(F.mamaNote)}</h3>${list(F.mama)}</div>
    <div class="fam-block"><h3><span class="deva">मासी का प्यार</span>Maternal aunts</h3>${list(F.masi)}</div>
    <div class="fam-block"><h3><span class="deva">हमारे घर आंगन की शोभा</span>The pride of our home</h3>${list(F.shobha)}</div>
    <div class="fam-block"><h3><span class="deva">बगिया के फूल</span>Flowers of our garden</h3><p class="chips">${F.bagiya.map(esc).join(" <i>·</i> ")}</p></div>`;

  const rsvpContact = W.contacts.find((c) => W.rsvpWhatsApp.endsWith(c.phone));
  if (rsvpContact) $("#rv-call").innerHTML = `or call ${esc(rsvpContact.name)} · <a href="tel:+91${esc(rsvpContact.phone)}">${esc(rsvpContact.phone.replace(/(\d{5})(\d{5})/, "$1 $2"))}</a>`;

  $("#contacts").innerHTML = W.contacts.map((c) => `<a href="tel:+91${esc(c.phone)}"><svg aria-hidden="true"><use href="#i-phone"/></svg><span><b>${esc(c.name)}</b><small>${esc(c.phone.replace(/(\d{5})(\d{5})/, "$1 $2"))}</small></span></a>`).join("");

  // Countdown
  const target = new Date(W.countdownTo).getTime();
  const cd = Object.fromEntries($$("[data-cd]").map((el) => [el.dataset.cd, el]));
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    let d = Math.max(0, target - Date.now());
    const D = Math.floor(d / 864e5); d -= D * 864e5;
    const H = Math.floor(d / 36e5); d -= H * 36e5;
    const M = Math.floor(d / 6e4); d -= M * 6e4;
    const set = (el, v) => {
      if (el.textContent === String(v)) return;
      el.textContent = v;
      if (window.gsap && !reduce) gsap.fromTo(el, { yPercent: -35, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    };
    set(cd.d, D); set(cd.h, pad(H)); set(cd.m, pad(M)); set(cd.s, pad(Math.floor(d / 1e3)));
  };
  tick(); setInterval(tick, 1000);

  /* ---------- Particles: golden dust by day, fireflies by night ---------- */
  function particles(canvas, night) {
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(2, devicePixelRatio || 1), running = false, raf = 0;
    const N = night ? (isMobile() ? 22 : 36) : (isMobile() ? 26 : 40);
    const P = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), r: night ? 0.6 + Math.random() * 1.8 : 0.8 + Math.random() * 2.2, s: night ? 0.0003 + Math.random() * 0.0007 : 0.00012 + Math.random() * 0.00028, a: Math.random() * 6.28, tw: 0.6 + Math.random() * 1.6 }));
    const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const frame = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.a += night ? 0.004 : 0.003; p.y -= p.s; p.x += Math.sin(p.a) * 0.0004;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        const glow = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * p.tw + p.a * 3));
        const x = p.x * w, y = p.y * h, R = p.r * (night ? 7 : 3.4);
        const g = ctx.createRadialGradient(x, y, 0, x, y, R);
        if (night) {
          g.addColorStop(0, `rgba(255,236,170,${0.9 * glow})`);
          g.addColorStop(0.25, `rgba(255,214,120,${0.35 * glow})`);
          g.addColorStop(1, "rgba(255,200,100,0)");
        } else {
          g.addColorStop(0, `rgba(255,250,232,${0.95 * glow})`);
          g.addColorStop(0.4, `rgba(222,176,92,${0.32 * glow})`);
          g.addColorStop(1, "rgba(222,176,92,0)");
        }
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.fill();
      }
      if (running) raf = requestAnimationFrame(frame);
    };
    size(); addEventListener("resize", size);
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!en.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
  }
  $$(".motes").forEach((c) => particles(c, false));
  $$(".fireflies").forEach((c) => particles(c, true));

  /* ---------- Petals: a few lotus petals drift down the paper pages ---------- */
  function petals(canvas, leaf) {
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(2, devicePixelRatio || 1), running = false, raf = 0;
    const P = Array.from({ length: isMobile() ? 7 : 11 }, () => ({ x: Math.random(), y: Math.random(), s: 0.00018 + Math.random() * 0.0002, r: 5 + Math.random() * 5, a: Math.random() * 6.28, spin: (Math.random() - 0.5) * 0.01, sway: 0.4 + Math.random() }));
    const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const frame = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y += p.s; p.a += p.spin;
        if (p.y > 1.03) { p.y = -0.03; p.x = Math.random(); }
        const x = (p.x + Math.sin(t / 3000 * p.sway + p.a) * 0.02) * w, y = p.y * h;
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.a); ctx.scale(1, 0.55 + 0.3 * Math.sin(t / 900 + p.a));
        const g = ctx.createLinearGradient(0, -p.r, 0, p.r);
        if (leaf) { g.addColorStop(0, "rgba(120,140,92,.5)"); g.addColorStop(1, "rgba(176,188,128,.35)"); }
        else { g.addColorStop(0, "rgba(228,176,184,.55)"); g.addColorStop(1, "rgba(246,222,222,.35)"); }
        ctx.fillStyle = g; ctx.beginPath();
        ctx.moveTo(0, -p.r); ctx.quadraticCurveTo(p.r * 0.9, 0, 0, p.r); ctx.quadraticCurveTo(-p.r * 0.9, 0, 0, -p.r); ctx.fill();
        ctx.restore();
      }
      if (running) raf = requestAnimationFrame(frame);
    };
    size(); addEventListener("resize", size);
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) { size(); running = true; raf = requestAnimationFrame(frame); }
      else if (!en.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
  }
  $$(".petals").forEach((c) => petals(c));
  // A few banyan leaves drift across the bride & groom
  $("#couple .stage").insertAdjacentHTML("beforeend", '<canvas class="leaves" aria-hidden="true"></canvas>');
  petals($("#couple .leaves"), true);

  /* ---------- RSVP sheet ---------- */
  const sheet = $("#rsvp-sheet");
  // Only ask about the journeys this guest is invited to
  const trips = {
    nagpur: days.some((d) => d.place === "Nagpur" && d.date < "2026-12-10"),
    jodhpur: days.some((d) => d.place === "Jodhpur"),
    reception: days.some((d) => d.date === "2026-12-14")
  };
  $$(".trow").forEach((r) => (r.hidden = !trips[r.dataset.trip]));
  let lenis = null;
  $("#rsvp-open").addEventListener("click", (e) => { e.preventDefault(); lenis && lenis.stop(); sheet.showModal(); });
  sheet.addEventListener("close", () => lenis && lenis.start());
  $("#rsvp-close").addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });
  $("#rsvp-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const n = (k) => Math.max(0, parseInt(f.get(k), 10) || 0);
    const lines = [
      `Radhe Radhe! RSVP for ${W.groom.honorific} ${W.groom.firstName} & ${W.bride.honorific} ${W.bride.firstName}'s wedding`,
      `Name: ${f.get("name")}`
    ];
    if (trips.nagpur) lines.push(`Travelling to Nagpur (7–8 Dec): ${n("nagpur")}`);
    if (trips.jodhpur) lines.push(`Travelling to Jodhpur (from 10 Dec): ${n("jodhpur")}`);
    if (trips.reception) lines.push(`Travelling to Nagpur (14 Dec, Ashirwad Samaroh): ${n("reception")}`);
    if (!n("nagpur") && !n("jodhpur") && !n("reception")) lines.push("Sorry, we can't make it, but sending our blessings!");
    if (f.get("note")) lines.push(`Note: ${f.get("note")}`);
    window.open(`https://wa.me/${W.rsvpWhatsApp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    sheet.close();
  });

  /* ---------- Music ---------- */
  const music = $("#music"), toggle = $("#music-toggle");
  if (W.music) music.src = W.music;
  music.addEventListener("error", () => (toggle.hidden = true));
  const setPlaying = (on) => { toggle.classList.toggle("paused", !on); toggle.setAttribute("aria-label", on ? "Pause music" : "Play music"); };
  toggle.addEventListener("click", () => (music.paused ? music.play().then(() => setPlaying(true)).catch(() => {}) : (music.pause(), setPlaying(false))));
  // Starts on the guest's tap (browsers only allow sound after a tap), then swells in gently
  const startMusic = () => {
    if (!W.music) return;
    music.volume = 0;
    music.play().then(() => {
      toggle.hidden = !!music.error; setPlaying(true);
      let v = 0; const up = setInterval(() => { v = Math.min(0.75, v + 0.03); music.volume = v; if (v >= 0.75) clearInterval(up); }, 120);
    }).catch(() => {});
  };

  /* ---------- Text splitting ---------- */
  // Devanagari letters join into one another, so Hindi animates word by word
  function splitChars(el) {
    const words = el.textContent.trim().split(/\s+/);
    const pieces = (w) => (/[ऀ-ॿ]/.test(w) ? [w] : [...w]);
    el.innerHTML = words.map((w) => `<span class="line-mask" style="display:inline-block"><span style="white-space:nowrap">${pieces(w).map((c) => `<span class="char">${esc(c)}</span>`).join("")}</span></span>`).join(" ");
    return $$(".char", el);
  }

  /* ---------- Expanding panels (full schedule, family) ---------- */
  function expander(btn, panel, onChange) {
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open);
      const label = $("span", btn);
      if (!btn.dataset.label) btn.dataset.label = label.textContent;
      label.textContent = open ? "Show less" : btn.dataset.label;
      if (!window.gsap) { panel.hidden = !open; return; }
      if (open) {
        panel.hidden = false;
        gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 1.1, ease: "expo.out", onComplete: onChange });
        gsap.from(panel.children, { y: 16, opacity: 0, duration: 1, stagger: 0.06, ease: "expo.out" });
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.7, ease: "power3.inOut", onComplete: () => { panel.hidden = true; gsap.set(panel, { clearProps: "height,opacity" }); onChange && onChange(); } });
      }
    });
  }

  /* =====================================================
     Motion
     ===================================================== */
  const gate = $("#gate");
  let opened = false;
  const unlock = () => { document.body.classList.remove("locked"); gate.remove(); };

  function noMotionFallback() {
    expander($("#more"), $("#schedule"));
    expander($("#fam-more"), $("#fam-full"));
    $("#door").style.transform = "translate(-50%, -50%)";
    $("#open-invite").addEventListener("click", () => { if (opened) return; opened = true; startMusic(); unlock(); });
  }

  function initMotion() {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.clearScrollMemory("manual"); // never jump back to an old scroll position
    gsap.defaults({ ease: "power3.out" });

    if (window.Lenis && !reduce) {
      lenis = new window.Lenis({ duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      window.__lenis = lenis;
    }
    const refresh = () => ScrollTrigger.refresh();
    expander($("#more"), $("#schedule"), refresh);
    expander($("#fam-more"), $("#fam-full"), refresh);


    const heroChars = $$(".h-name").flatMap(splitChars);
    $$("[data-split]").forEach(splitChars);

    // How long a scene plays before the next sheet starts to slide over it
    const vh = () => document.documentElement.clientHeight;
    const playFor = (sec) => () => "+=" + Math.max(vh() * 0.4, sec.offsetHeight - (sec.nextElementSibling?.classList.contains("over") ? 2 : 1) * vh());
    const scene = (id, vars = {}) => {
      const sec = $(id);
      return gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: sec, start: "top top", end: playFor(sec), scrub: 1.2, ...vars } });
    };

    // --- I · Dawn: the lotus, and the names in the first light
    const intro = gsap.timeline({ paused: true })
      .from(".h-art img", { scale: 1.16, duration: 5, ease: "expo.out" }, 0)
      .from(".hero .motes", { opacity: 0, duration: 3 }, 0.6)
      .from(heroChars, { yPercent: 110, opacity: 0, duration: 1.6, stagger: 0.045, ease: "expo.out" }, 1.1)
      .from(".h-amp", { opacity: 0, scale: 0.6, duration: 1.6, ease: "expo.out" }, 1.5)
      .from(".h-hair", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 1.7)
      .from(".h-date, .h-greeting", { opacity: 0, letterSpacing: "1em", duration: 2, ease: "expo.out", stagger: 0.12 }, 1.9)
      .from(".h-scroll", { opacity: 0, duration: 1.4 }, 2.4)
      .add(() => { if (!reduce) gsap.to(".h-art img", { scale: 1.045, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 }); });

    scene("#hero")
      .to(".h-title", { yPercent: -18, opacity: 0, duration: 0.6 }, 0.1)
      .to(".h-scroll", { opacity: 0, duration: 0.2 }, 0)
      .to(".h-art", { scale: 1.12, transformOrigin: "68% 62%", duration: 1 }, 0);

    // Each stage settles back a touch as the next sheet slides over it
    $$(".sheet.over").forEach((next) => {
      const stage = next.previousElementSibling && $(".stage", next.previousElementSibling);
      if (!stage) return;
      gsap.fromTo(stage, { scale: 1, opacity: 1 }, { scale: 0.94, opacity: 0.55, ease: "none", transformOrigin: "50% 30%", scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } });
    });

    // --- Reveals: text rises softly into place
    gsap.set("[data-reveal]", { opacity: 0, y: 22 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%", once: true,
      onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.8, ease: "expo.out", stagger: 0.1, overwrite: true })
    });
    $$("[data-split]").forEach((el) => gsap.from($$(".char", el), { yPercent: 105, opacity: 0, duration: 1.6, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
    $$("[data-draw]").forEach((el) => gsap.from(el, { scaleX: 0, duration: 1.8, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%" } }));
    $$(".folio").forEach((el) => gsap.from($("span", el), { opacity: 0, y: -8, duration: 1.4, scrollTrigger: { trigger: el, start: "top 92%" } }));

    // --- II · The darshan arch opens, its gold line draws itself
    gsap.timeline({ scrollTrigger: { trigger: ".deity", start: "top 85%" } })
      .from(".deity-pic", { opacity: 0, y: 24, duration: 2, ease: "expo.out" }, 0)
      .from(".deity-pic img", { scale: 1.25, duration: 2.8, ease: "expo.out" }, 0)
      .fromTo("#deity-orn .draw", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, stagger: 0.12, ease: "power2.inOut" }, 0.1)
      .from("#deity-orn .orn-fill", { scale: 0, opacity: 0, transformOrigin: "50% 50%", duration: 1, ease: "back.out(2)" }, 1.1);
    $$(".orn").forEach((o) => gsap.timeline({ scrollTrigger: { trigger: o, start: "top 92%" } })
      .from($$("i", o), { scaleX: 0, duration: 1.6, ease: "expo.out" })
      .from($("svg", o), { scale: 0.3, rotate: -40, opacity: 0, duration: 1.4, ease: "back.out(1.8)" }, 0.2));

    // --- III · Their hands: the camera drifts back in one long, unhurried
    // move while the Gita appears line by line
    const hands = $("#hands");
    gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: hands, start: "top 75%", end: () => "+=" + (hands.offsetHeight - 2 * vh() + vh() * 0.75), scrub: 2 } })
      .fromTo(".hands-art", { scale: 1.5, yPercent: 6 }, { scale: 1, yPercent: 0, transformOrigin: "62% 48%", ease: "sine.inOut", duration: 1 }, 0)
      .fromTo(".hands-veil", { opacity: 0.4 }, { opacity: 1, duration: 0.4 }, 0.3)
      .from(".gita-sa p", { opacity: 0, y: 16, filter: "blur(6px)", stagger: 0.1, duration: 0.2, ease: "sine.out" }, 0.45)
      .from(".gita .hair", { scaleX: 0, duration: 0.12, ease: "sine.out" }, 0.66)
      .from(".gita-en", { opacity: 0, y: 12, filter: "blur(4px)", duration: 0.18, ease: "sine.out" }, 0.7)
      .from(".gita-ref", { opacity: 0, duration: 0.12 }, 0.84);

    // --- IV · The temple corridor breathes behind the celebrations
    gsap.fromTo(".prog-art", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#programme", start: "top top", end: "bottom bottom", scrub: true } });
    gsap.from(".prog-panel", { opacity: 0, y: 40, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: ".prog-panel", start: "top 85%" } });
    gsap.fromTo(".ev-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#key-events", start: "top 75%", end: "bottom 60%", scrub: 1 } });
    $$(".ev-date b").forEach((b) => {
      const n = Number(b.textContent), o = { v: Math.max(1, n - 6) };
      gsap.to(o, { v: n, duration: 1.4, ease: "power2.out", onUpdate: () => (b.textContent = Math.round(o.v)), scrollTrigger: { trigger: b, start: "top 88%" } });
    });
    $$(".ev-route").forEach((r) => gsap.from(r, { opacity: 0, x: -10, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: r, start: "top 92%" } }));
    $$(".event").forEach((ev) => gsap.timeline({ scrollTrigger: { trigger: ev, start: "top 88%" } })
      .from($(".ev-date", ev), { opacity: 0, y: 14, duration: 1.4, ease: "expo.out" })
      .from($("div", ev), { opacity: 0, x: 14, duration: 1.4, ease: "expo.out" }, 0.1));

    // --- V · Their own joined hands: the photo softens and the bride & groom appear above them
    scene("#couple")
      .fromTo(".cp-art", { scale: 1.16 }, { scale: 1.02, transformOrigin: "50% 40%", ease: "sine.inOut", duration: 1 }, 0)
      .fromTo(".cp-shade", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.05)
      .fromTo(".cp-art img", { filter: "blur(0px)" }, { filter: "blur(1.2px)", duration: 0.3 }, 0.05)
      .from(".cp-content .label", { opacity: 0, y: 12, duration: 0.15 }, 0.12)
      .from(".cp-title", { opacity: 0, y: 20, filter: "blur(8px)", duration: 0.2 }, 0.1)
      .fromTo(".portrait:first-child", { xPercent: -60, rotation: -9, opacity: 0 }, { xPercent: 0, rotation: -3, opacity: 1, ease: "sine.out", duration: 0.45 }, 0.2)
      .fromTo(".portrait:last-child", { xPercent: 60, rotation: 9, opacity: 0 }, { xPercent: 0, rotation: 3, opacity: 1, ease: "sine.out", duration: 0.45 }, 0.2)
      .fromTo(".portrait .draw", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, stagger: 0.02 }, 0.45)
      .from(".cp-amp", { opacity: 0, scale: 0.4, duration: 0.2, ease: "back.out(2)" }, 0.6);

    if (!reduce) $$(".portrait").forEach((p, i) => gsap.to(p, { y: -5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 1.3 }));

    // --- VI · RSVP: the Mathura bells swing softly, as if just rung
    gsap.fromTo(".rv-art", { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1, ease: "none", scrollTrigger: { trigger: "#rsvp", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".rv-art img", { rotate: 1.6 }, { rotate: 0, transformOrigin: "60% 0%", duration: 4.5, ease: "elastic.out(1, 0.22)", scrollTrigger: { trigger: "#rsvp", start: "top 45%" } });
    gsap.timeline({ scrollTrigger: { trigger: ".rv-card", start: "top 80%" } })
      .from(".rv-card", { opacity: 0, y: 40, duration: 1.8, ease: "expo.out" })
      .from(".rv-card > *", { opacity: 0, y: 12, stagger: 0.08, duration: 1.2, ease: "expo.out" }, 0.3)
      .from(".rv-card .hair", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0.6);

    // --- VII · Dusk over the hill temple: the names, then the countdown
    gsap.fromTo(".c-art", { yPercent: -5, scale: 1.1 }, { yPercent: 3, scale: 1, ease: "none", scrollTrigger: { trigger: "#closing", start: "top bottom", end: "bottom bottom", scrub: 1.2 } });
    gsap.timeline({ scrollTrigger: { trigger: "#closing", start: "top 40%" } })
      .from(".c-top > *", { opacity: 0, y: 18, filter: "blur(6px)", stagger: 0.15, duration: 1.8, ease: "expo.out" })
      .from(".c-mid > *, .c-bottom > *", { opacity: 0, y: 14, stagger: 0.1, duration: 1.6, ease: "expo.out" }, 0.6)
      .from(".closing .fireflies", { opacity: 0, duration: 3 }, 0.4);

    gsap.from(".contacts a", { opacity: 0, x: -14, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".contacts", start: "top 88%" } });
    if (!reduce) gsap.fromTo(".c-radhe", { textShadow: "0 0 0px rgba(240,226,190,0)" }, { textShadow: "0 0 18px rgba(240,226,190,.85)", duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

    // --- Moments: each photograph opens like a window, then drifts at its own pace
    $$(".m").forEach((m, i) => {
      gsap.from(m, { clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "expo.inOut", scrollTrigger: { trigger: m, start: "top 88%" } });
      gsap.fromTo($("img", m), { yPercent: -9 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(m, { y: [-26, 18, -14, 22][i], ease: "none", scrollTrigger: { trigger: ".collage", start: "top bottom", end: "bottom top", scrub: true } });
    });
    // The faint photographs on the paper pages drift very slowly
    $$(".ghost img").forEach((g) => gsap.fromTo(g, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: g.closest("section"), start: "top bottom", end: "bottom top", scrub: true } }));

    // --- The browser bar follows the colour of each sheet
    const meta = $('meta[name="theme-color"]');
    $$(".sheet[data-tone]").forEach((s) => ScrollTrigger.create({
      trigger: s, start: "top 50%", end: "bottom 50%",
      onToggle: (self) => { if (self.isActive) meta.content = s.dataset.tone; }
    }));

    // --- The mor pankh drifts along the margins through the story
    const tr = $("#traveller");
    const setX = gsap.quickSetter(tr, "x", "px"), setY = gsap.quickSetter(tr, "y", "px"), setR = gsap.quickSetter(tr, "rotation", "deg");
    ScrollTrigger.create({
      trigger: "#invite", start: "top 70%", endTrigger: "#closing", end: "top top",
      onUpdate: (self) => {
        const p = self.progress, w = innerWidth, h = vh(), fw = isMobile() ? 28 : 36;
        const g = isMobile() ? 4 : w * 0.05;
        const side = 0.5 + 0.5 * Math.tanh(5 * Math.sin(p * Math.PI * 7 - Math.PI / 2));
        setX(g + (w - 2 * g - fw) * side);
        setY(h * (0.16 + 0.48 * (0.5 + 0.5 * Math.sin(p * Math.PI * 13))));
        setR(Math.cos(p * Math.PI * 7 - Math.PI / 2) * 34 + Math.sin(p * 40) * 6);
        tr.style.opacity = Math.min(1, p * 30, (1 - p) * 30) * (isMobile() ? 0.7 : 0.85);
      },
      onLeave: () => (tr.style.opacity = 0), onLeaveBack: () => (tr.style.opacity = 0)
    });
    if (isMobile()) gsap.set(tr, { width: 28, height: 101 });

    // --- The temple doors swing open and we walk through into the morning
    $("#open-invite").addEventListener("click", () => {
      if (opened) return;
      opened = true;
      startMusic();
      window.scrollTo(0, 0);
      gsap.timeline({ onComplete: () => { unlock(); ScrollTrigger.clearScrollMemory(); window.scrollTo(0, 0); lenis && lenis.start(); ScrollTrigger.refresh(); window.scrollTo(0, 0); } })
        .to(".gate-center", { opacity: 0, scale: 0.94, filter: "blur(8px)", duration: 0.9, ease: "power2.in" })
        .set("#gate", { backgroundColor: "rgba(0,0,0,0)" }, 0.6)
        .to(".door-light", { opacity: 1, duration: 1.2 }, 0.5)
        .to(".leaf.left", { rotationY: 98, duration: 2.8, ease: "power2.inOut" }, 0.7)
        .to(".leaf.right", { rotationY: -98, duration: 2.8, ease: "power2.inOut" }, 0.7)
        .to(".leaf", { filter: "brightness(.5)", duration: 2.8, ease: "power2.inOut" }, 0.7)
        .to(".door", { scale: 2.8, duration: 2.8, ease: "power2.in" }, 1.7)
        .to(".door-light", { opacity: 0, duration: 1.4 }, 2.4)
        .to(".door", { opacity: 0, duration: 1, ease: "power1.in" }, 3.4)
        .add(() => intro.play(), 2.4);
    });
    gsap.set(".door", { xPercent: -50, yPercent: -50, transformOrigin: "50% 62%" });
    gsap.from(".door", { scale: 1.08, duration: 3.2, ease: "expo.out" });
    gsap.from(".gate-center > *", { y: 20, opacity: 0, filter: "blur(6px)", stagger: 0.15, duration: 1.6, ease: "expo.out", delay: 0.2 });
    gsap.to(".seal-feather", { rotate: 20, y: -4, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });

    let rw = innerWidth;
    addEventListener("resize", () => {
      if (Math.abs(innerWidth - rw) < 2) return; // ignore mobile URL-bar height changes
      rw = innerWidth;
      ScrollTrigger.refresh();
    });
  }

  const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
  fontsReady.then(() => (hasGSAP ? initMotion() : noMotionFallback()));
})();

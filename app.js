// app.js — ilova logikasi: particle fon, login, darslar, test, animatsiyalar
"use strict";

/* ===== Telegram Mini App ===== */
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) { tg.ready(); tg.expand(); }

/* ===== Orqa fon: suzuvchi harflar (optimallashtirilgan canvas) ===== */
(function () {
  const cv = document.getElementById("bg");
  const cx = cv.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const GLYPHS = ["А","Б","В","Д","Ж","И","К","Л","Н","П","С","У","Ф","Ш","Э","Ю","Я","★","✦","♪","❄"];
  let W = 0, H = 0, items = [], running = true;

  function make() {
    return {
      x: Math.random() * W, y: H + 60 * DPR,
      s: (9 + Math.random() * 16) * DPR,
      vy: (0.12 + Math.random() * 0.35) * DPR,
      vx: (Math.random() - 0.5) * 0.15 * DPR,
      a: 0.05 + Math.random() * 0.11,
      g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.005,
      c: Math.random() > 0.5 ? "#8e7bff" : "#22d3ee",
    };
  }
  function resize() {
    W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    // Optimizatsiya: zarrachalar soni ekranga qarab, maksimal 34 ta
    const n = Math.min(34, Math.round((innerWidth * innerHeight) / 24000));
    items = Array.from({ length: n }, () => { const p = make(); p.y = Math.random() * H; return p; });
  }
  function tick() {
    if (!running) return;
    cx.clearRect(0, 0, W, H);
    for (const p of items) {
      p.y -= p.vy; p.x += p.vx; p.r += p.vr;
      if (p.y < -50) Object.assign(p, make());
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.globalAlpha = p.a; cx.fillStyle = p.c; cx.font = p.s + "px sans-serif";
      cx.fillText(p.g, 0, 0); cx.restore();
    }
    requestAnimationFrame(tick);
  }
  // Optimizatsiya: ilova yopiq bo'lsa animatsiya to'xtaydi
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden; if (running) requestAnimationFrame(tick);
  });
  addEventListener("resize", resize, { passive: true });
  resize(); tick();
})();

/* ===== SVG ikonkalar (qo'lda chizilgan) ===== */
function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; }
const ICON = {
  book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
  grad: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
  rocket: svg('<path d="M4.5 16.5c-1.5 1.4-2 5-2 5s3.6-.5 5-2c.8-.8.8-2 0-2.9-.8-.8-2.2-.8-3-.1z"/><path d="M12 15l-3-3c.4-1.4 1-2.7 2-4a12.6 12.6 0 0 1 10.5-6c0 2.7-.9 7.4-6 10.6-1.3 1-2.7 1.6-4 2z"/>'),
  crown: svg('<path d="M2 18h20L20 8l-5 4-3-7-3 7-5-4z"/>'),
  lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>'),
  trophy: svg('<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 5M17 6h3a3 3 0 0 1-3 5"/>'),
  back: svg('<path d="m15 18-6-6 6-6"/>'),
  flame: svg('<path d="M12 22c4.4 0 7-2.8 7-6.5 0-3.5-2.5-5.5-3.7-8.5-2 1.7-2.8 3.3-3.3 5-1-1-1.5-2.7-1.5-4.5C8 9.5 5 12 5 15.5 5 19.2 7.6 22 12 22z"/>'),
  out: svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'),
};
const LEVEL_ICON = { A1: "book", A2: "grad", B1: "rocket", B2: "crown" };

/* ===== Ma'lumotlar: localStorage + Telegram CloudStorage ===== */
function readDB() { try { return JSON.parse(localStorage.getItem("rt_db")) || { users: {} }; } catch (e) { return { users: {} }; } }
function writeDB(d) {
  localStorage.setItem("rt_db", JSON.stringify(d));
  if (tg && tg.CloudStorage) tg.CloudStorage.setItem("rt_db", JSON.stringify(d), function () {});
}
function hash(s) { let h = 9; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 387420489); return (h >>> 0).toString(36); }

let db = readDB();
let me = null;   // joriy foydalanuvchi
let quiz = null; // joriy test holati
const app = document.getElementById("app");

// Telegram CloudStorage'dan tiklash (boshqa qurilmada ham ishlashi uchun)
if (tg && tg.CloudStorage) tg.CloudStorage.getItem("rt_db", function (err, val) {
  if (!err && val && !localStorage.getItem("rt_db")) { localStorage.setItem("rt_db", val); db = readDB(); }
});

/* ===== Yordamchilar ===== */
function user() { return db.users[me]; }
const XP_RANKS = [[1500, "🏆 PRO"], [800, "🥇 Usta"], [400, "🥈 Bilimdon"], [150, "🥉 O'rganuvchi"], [0, "🌱 Yangi boshlovchi"]];
function rank(xp) { for (const r of XP_RANKS) if (xp >= r[0]) return r[1]; }
function best(L, i) { const u = user(); return (u.progress[L] && u.progress[L][i]) || 0; }
function levelDone(L) { return DATA[L].darslar.every((_, i) => best(L, i) >= PASS); }
function levelOpen(L) { const idx = LEVELS.indexOf(L); return idx === 0 || levelDone(LEVELS[idx - 1]); }
function lessonOpen(L, i) { return i === 0 ? levelOpen(L) : best(L, i - 1) >= PASS; }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}
function confetti() {
  const colors = ["#8e7bff", "#22d3ee", "#34d399", "#fbbf24", "#f87171"];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement("i"); c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(c); setTimeout(() => c.remove(), 3400);
  }
}

/* ===== Kirish / Ro'yxatdan o'tish ===== */
let authMode = "login";
function setMode(m) { authMode = m; authScreen(); }
function authScreen() {
  const tgName = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : "";
  app.innerHTML = `<div class="center fade"><div class="logo">${ICON.rocket}</div><h1 class="title">Rus tili <span class="grad-txt">PRO</span></h1><p class="sub">A1 dan B2 gacha — o'ynab o'rganing 🎮</p><div class="glass form"><div class="tabs"><button class="tab ${authMode === "login" ? "on" : ""}" onclick="setMode('login')">Kirish</button><button class="tab ${authMode === "register" ? "on" : ""}" onclick="setMode('register')">Ro'yxatdan o'tish</button></div><input id="f-name" class="inp" placeholder="👤 Ism (login)" value="${authMode === "register" ? tgName : ""}" maxlength="20"><input id="f-pass" class="inp" type="password" placeholder="🔑 Parol" maxlength="30"><button class="btn grad" onclick="submitAuth()">${authMode === "login" ? "🚀 Kirish" : "✨ Boshlash"}</button></div></div>`;
}
function submitAuth() {
  const name = document.getElementById("f-name").value.trim();
  const pass = document.getElementById("f-pass").value;
  if (name.length < 2) return toast("Ism kamida 2 harf bo'lsin");
  if (pass.length < 4) return toast("Parol kamida 4 belgi bo'lsin");
  if (authMode === "register") {
    if (db.users[name]) return toast("Bu ism band — Kirish bo'limini tanlang");
    db.users[name] = { pass: hash(pass), xp: 0, progress: {}, created: Date.now() };
    writeDB(db); me = name; localStorage.setItem("rt_me", name);
    confetti(); toast("Xush kelibsiz, " + name + "! 🎉"); home();
  } else {
    const u = db.users[name];
    if (!u || u.pass !== hash(pass)) return toast("Ism yoki parol noto'g'ri 😕");
    me = name; localStorage.setItem("rt_me", name); home();
  }
}
function logout() { me = null; localStorage.removeItem("rt_me"); authScreen(); }

/* ===== Bosh menyu ===== */
function home() {
  const u = user();
  const cards = LEVELS.map(L => {
    const d = DATA[L]; const open = levelOpen(L);
    const done = d.darslar.filter((_, i) => best(L, i) >= PASS).length;
    const pct = Math.round(done / d.darslar.length * 100);
    const prev = LEVELS[LEVELS.indexOf(L) - 1];
    return `<div class="lvl glass ${open ? "" : "locked"}" onclick="${open ? `openLevel('${L}')` : `toast('🔒 Avval ${prev} ni tugating!')`}"><div class="lvl-ic">${ICON[LEVEL_ICON[L]]}</div><div class="lvl-body"><b>${d.nom}</b><small>${d.tavsif}</small><div class="bar"><div class="fill" style="width:${pct}%"></div></div><small class="mut">${done}/${d.darslar.length} dars · ${pct}%</small></div>${open ? "" : `<div class="lock">${ICON.lock}</div>`}</div>`;
  }).join("");
  app.innerHTML = `<div class="fade"><div class="head glass"><div class="ava">${ICON.user}</div><div><b>${me}</b><br><small class="mut">${rank(u.xp)}</small></div><div class="xp">${ICON.flame}<b>${u.xp}</b> XP</div><button class="ghost" onclick="logout()">${ICON.out}</button></div><h2 class="sec">📚 Darajalar</h2>${cards}<p class="foot">✨ Har darsni ${PASS}%+ bilan tugatsangiz, keyingisi ochiladi</p></div>`;
}

/* ===== Daraja: darslar ro'yxati ===== */
function openLevel(L) {
  const d = DATA[L];
  const rows = d.darslar.map((dars, i) => {
    const open = lessonOpen(L, i); const b = best(L, i);
    const stars = b >= 95 ? "⭐⭐⭐" : b >= 85 ? "⭐⭐" : b >= PASS ? "⭐" : "";
    return `<div class="lesson glass ${open ? "" : "locked"}" onclick="${open ? `startLesson('${L}',${i})` : "toast('🔒 Oldingi darsni tugating!')"}"><div class="num ${b >= PASS ? "done" : ""}">${b >= PASS ? "✓" : i + 1}</div><div class="lvl-body"><b>${dars.nom}</b><small class="mut">${dars.savollar.length} savol ${b ? "· eng yaxshi: " + b + "% " + stars : ""}</small></div>${open ? "" : `<div class="lock">${ICON.lock}</div>`}</div>`;
  }).join("");
  app.innerHTML = `<div class="fade"><div class="head glass"><button class="ghost" onclick="home()">${ICON.back}</button><div><b>${d.nom}</b><br><small class="mut">${d.tavsif}</small></div></div>${rows}</div>`;
}

/* ===== Test ===== */
function startLesson(L, i) {
  quiz = { L: L, i: i, qs: shuffle(DATA[L].darslar[i].savollar.slice()), qi: 0, ok: 0 };
  question();
}
function question() {
  const q = quiz.qs[quiz.qi];
  const opts = q.v.map((v, i) => `<button class="opt glass" onclick="answer(${i})">${v}</button>`).join("");
  app.innerHTML = `<div class="fade"><div class="head glass"><button class="ghost" onclick="openLevel('${quiz.L}')">${ICON.back}</button><div style="flex:1"><div class="bar"><div class="fill" style="width:${quiz.qi / quiz.qs.length * 100}%"></div></div><small class="mut">${quiz.qi + 1}/${quiz.qs.length} · ✅ ${quiz.ok}</small></div></div><div class="qcard glass"><h3>${q.s}</h3></div><div id="opts">${opts}</div><div id="after"></div></div>`;
}
function answer(i) {
  const q = quiz.qs[quiz.qi];
  const btns = document.querySelectorAll(".opt");
  btns.forEach(b => b.disabled = true);
  btns[q.t].classList.add("ok");
  if (i === q.t) { quiz.ok++; btns[i].classList.add("pop"); }
  else { btns[i].classList.add("bad", "shake"); }
  quiz.qi++;
  const last = quiz.qi >= quiz.qs.length;
  document.getElementById("after").innerHTML = `<div class="izoh glass fade">💡 ${q.i}</div><button class="btn grad fade" onclick="${last ? "finish()" : "question()"}">${last ? "🏁 Natija" : "➡️ Keyingi"}</button>`;
}

/* ===== Natija + qulf ochish ===== */
function finish() {
  const total = quiz.qs.length, pct = Math.round(quiz.ok / total * 100), passed = pct >= PASS;
  const u = user(); const L = quiz.L, i = quiz.i;
  const old = best(L, i);
  if (!u.progress[L]) u.progress[L] = {};
  if (pct > old) u.progress[L][i] = pct;
  const gained = quiz.ok * 10 + (passed ? 20 : 0);
  u.xp += gained; writeDB(db);
  let unlockMsg = "";
  if (passed) {
    confetti();
    if (i + 1 < DATA[L].darslar.length) unlockMsg = `🔓 Yangi dars ochildi: <b>${DATA[L].darslar[i + 1].nom}</b>`;
    else {
      const nxt = LEVELS[LEVELS.indexOf(L) + 1];
      if (nxt && levelOpen(nxt)) unlockMsg = `🎉 <b>${DATA[nxt].nom}</b> darajasi ochildi!`;
      else if (!nxt && levelDone(L)) unlockMsg = "🏆 Siz BARCHA darajalarni tugatdingiz!";
    }
  }
  app.innerHTML = `<div class="center fade"><div class="logo ${passed ? "" : "sad"}">${passed ? ICON.trophy : ICON.book}</div><h1 class="title">${passed ? "Ajoyib!" : "Yana urinib ko'ring"}</h1><div class="pct grad-txt" id="pct">0%</div><p class="sub">✅ ${quiz.ok}/${total} to'g'ri · ${ICON.flame} +${gained} XP</p>${unlockMsg ? `<div class="izoh glass">${unlockMsg}</div>` : ""}<button class="btn grad" onclick="startLesson('${L}',${i})">🔄 Qayta yechish</button><button class="btn" onclick="openLevel('${L}')">📚 Darslar</button><button class="btn" onclick="home()">🏠 Bosh menyu</button></div>`;
  // Foiz sanab chiqish animatsiyasi
  let n = 0; const el = document.getElementById("pct");
  const timer = setInterval(() => { n += 2; if (n >= pct) { n = pct; clearInterval(timer); } el.textContent = n + "%"; }, 20);
}

/* ===== Ishga tushirish ===== */
me = localStorage.getItem("rt_me");
if (me && db.users[me]) home(); else { me = null; authScreen(); }

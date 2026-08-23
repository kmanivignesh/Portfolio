/* ================================================================
   K. MANI VIGNESH PORTFOLIO — main.js
   Premium Three.js 3D Backgrounds — subtle, professional, atmospheric
   ================================================================ */
import * as THREE from 'three';

// ════ CURSOR ════════════════════════════════════════════════
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function loop() {
  tx += (mx - tx) * .13; ty += (my - ty) * .13;
  curRing.style.left = tx + 'px'; curRing.style.top = ty + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, input, textarea, .skill-box, .proj-card, .c-item, .pub-card, .cat-tab').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('grow'); curRing.classList.add('grow'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('grow'); curRing.classList.remove('grow'); });
});

// ════ PRELOADER ══════════════════════════════════════════════
let pct = 0;
const plNum = document.getElementById('pl-num');
const plBar = document.getElementById('pl-bar');
const plEl  = document.getElementById('preloader');
const plTick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 7 + 3, 100);
  if (plNum) plNum.textContent = Math.floor(pct);
  if (plBar) plBar.style.width = pct + '%';
  if (pct >= 100) {
    clearInterval(plTick);
    setTimeout(() => { plEl.classList.add('gone'); runHeroEntrance(); countUp(); }, 400);
  }
}, 55);

// ════ HERO ENTRANCE ══════════════════════════════════════════
function runHeroEntrance() {
  ['hk','hn1','hn2','hr','hb','hs-wrap'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.animationDelay = (i * 0.13) + 's';
    el.style.animationName = 'heroIn';
    el.style.animationDuration = '0.9s';
    el.style.animationFillMode = 'both';
    el.style.animationTimingFunction = 'cubic-bezier(.16,1,.3,1)';
  });
}
const heroStyle = document.createElement('style');
heroStyle.textContent = `
  @keyframes heroIn { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
  .hero-kicker,.hn-first,.hn-last,.hero-role,.hero-btns,.hero-stats,.scroll-cue{opacity:0}
`;
document.head.appendChild(heroStyle);

// ════ COUNT UP ════════════════════════════════════════════════
function countUp() {
  document.querySelectorAll('.hstat-n').forEach(el => {
    const target = parseFloat(el.dataset.to), dec = parseInt(el.dataset.dec || '0');
    let v = 0; const step = target / 60;
    const timer = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = dec > 0 ? v.toFixed(dec) : Math.floor(v);
      if (v >= target) { el.textContent = dec > 0 ? target.toFixed(dec) : target; clearInterval(timer); }
    }, 25);
  });
}

// ════ NAV ════════════════════════════════════════════════════
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', window.scrollY > 60));
const navOpenBtn  = document.getElementById('nav-open-btn');
const navCloseBtn = document.getElementById('nav-close-btn');
navOpenBtn?.addEventListener('click',  () => document.body.classList.remove('nav-closed'));
navCloseBtn?.addEventListener('click', () => document.body.classList.add('nav-closed'));
const ham = document.getElementById('ham'), mobMenu = document.getElementById('mob-menu'), mobClose = document.getElementById('mob-close');
ham?.addEventListener('click',      () => mobMenu.classList.add('open'));
mobClose?.addEventListener('click', () => mobMenu.classList.remove('open'));
document.querySelectorAll('.mob-menu a').forEach(l => l.addEventListener('click', () => mobMenu.classList.remove('open')));

// ════ SMOOTH SCROLL ══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); mobMenu.classList.remove('open'); }
  });
});

// ════ SCROLL REVEAL ══════════════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObs.observe(el));

// ════ CATEGORY FILTER TABS ════════════════════════════════════
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.proj-category').forEach(cat_el => {
      const hasBadge = cat_el.querySelector('.cat-badge');
      if (!hasBadge) return;
      const badgeCat = hasBadge.classList.contains('ai') ? 'ai' : hasBadge.classList.contains('iot') ? 'iot' : 'fullstack';
      cat_el.style.display = (cat === 'all' || cat === badgeCat) ? '' : 'none';
    });
  });
});

// ════ CARD 3D TILT ════════════════════════════════════════════
function addTilt(selector, maxDeg = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(800px) translateY(-6px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg)`;
      card.style.transition = 'box-shadow .3s, border-color .3s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });
}
addTilt('.skill-box', 10);
addTilt('.proj-card', 6);
addTilt('.pub-card',  6);

// ════ TEXT SCRAMBLE ════════════════════════════════════════════
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el) {
  if (el.dataset.scrambling) return;
  if (!el.dataset.orig) el.dataset.orig = el.textContent;
  const orig = el.dataset.orig;
  el.dataset.scrambling = '1';
  let iter = 0;
  const iv = setInterval(() => {
    el.textContent = orig.split('').map((c,i) =>
      c === ' ' ? ' ' : i < iter/3 ? orig[i] : CHARS[Math.floor(Math.random()*CHARS.length)]
    ).join('');
    if (++iter > orig.length * 3) { el.textContent = orig; clearInterval(iv); delete el.dataset.scrambling; }
  }, 28);
}
document.querySelectorAll('.hn-first, .hn-last').forEach(el => el.addEventListener('mouseenter', () => scramble(el)));

// ════ CONTACT FORM ════════════════════════════════════════════
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const msg   = document.getElementById('fmsg').value;
  window.location.href = `mailto:kmvignesh2005@gmail.com?subject=${encodeURIComponent('Portfolio Contact from '+name)}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\nMessage:\n'+msg)}`;
});

// ════════════════════════════════════════════════════════════
//  GLOBAL MOUSE
// ════════════════════════════════════════════════════════════
let gMouseX = 0, gMouseY = 0;
document.addEventListener('mousemove', e => {
  gMouseX = (e.clientX / innerWidth  - 0.5) * 2;
  gMouseY = (e.clientY / innerHeight - 0.5) * 2;
});

// Helper: build renderer + camera
function buildScene(canvasId, fovDeg, camZ) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fovDeg, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
  camera.position.z = camZ;
  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });
  return { renderer, scene, camera };
}

// ══════════════════════════════════════════════════════════════
// SCENE 1 ─ HERO: Particle constellation + orbiting rings
//   Vibrant because the hero-overlay dims the canvas for readability
// ══════════════════════════════════════════════════════════════
(function heroScene() {
  const s = buildScene('hero-canvas', 60, 48);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // ── Deep-field tiny stars
  const STARS = 2400;
  const sPos = new Float32Array(STARS * 3);
  const sCol = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    sPos[i*3]   = (Math.random()-.5)*180;
    sPos[i*3+1] = (Math.random()-.5)*120;
    sPos[i*3+2] = (Math.random()-.5)*60;
    const c = new THREE.Color().setHSL(.57+Math.random()*.18, .8, .55+Math.random()*.35);
    sCol[i*3]=c.r; sCol[i*3+1]=c.g; sCol[i*3+2]=c.b;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos,3));
  sGeo.setAttribute('color',    new THREE.BufferAttribute(sCol,3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({
    size:.22, vertexColors:true, transparent:true, opacity:.55,
    blending:THREE.AdditiveBlending, depthWrite:false
  })));

  // ── Constellation nodes
  const NODE_N = 55;
  const nodeGeo = new THREE.SphereGeometry(.18, 8, 8);
  const nodes = [];
  for (let i = 0; i < NODE_N; i++) {
    const hue = .55 + Math.random()*.18;
    const mesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(hue,1,.7), transparent:true, opacity:.9,
      blending:THREE.AdditiveBlending, depthWrite:false
    }));
    const r = 8 + Math.random()*22;
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    mesh.position.set(r*Math.sin(ph)*Math.cos(th), r*Math.sin(ph)*Math.sin(th), r*Math.cos(ph));
    mesh.userData = { base: mesh.position.clone(), phase: Math.random()*Math.PI*2, spd: .25+Math.random()*.4, pp: Math.random()*Math.PI*2 };
    nodes.push(mesh); scene.add(mesh);
  }

  // ── Connection lines
  const connMat = new THREE.LineBasicMaterial({ color:0x0055cc, transparent:true, opacity:.18, blending:THREE.AdditiveBlending, depthWrite:false });
  const conns = [];
  for (let i = 0; i < NODE_N; i++) {
    for (let j = i+1; j < NODE_N; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 13 && conns.length < 100) {
        const g = new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(), nodes[j].position.clone()]);
        conns.push({ line: new THREE.Line(g, connMat.clone()), a: nodes[i], b: nodes[j] });
        scene.add(conns[conns.length-1].line);
      }
    }
  }

  // ── Electric arcs
  let arcTimer = 0;
  function spawnArc() {
    if (!conns.length) return;
    const pick = conns[Math.floor(Math.random()*conns.length)];
    const pts = [];
    for (let k = 0; k <= 14; k++) {
      const t = k/14;
      const p = new THREE.Vector3().lerpVectors(pick.a.position, pick.b.position, t);
      p.x += (Math.random()-.5)*1.8*Math.sin(t*Math.PI);
      p.y += (Math.random()-.5)*1.8*Math.sin(t*Math.PI);
      pts.push(p);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.55+Math.random()*.15,1,.8), transparent:true, opacity:.85, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    let life = 0;
    const step = () => { life += .018; mat.opacity = .85*(1-life/.5); if (life < .5) requestAnimationFrame(step); else { scene.remove(line); geo.dispose(); mat.dispose(); } };
    step();
  }

  // ── Orbiting rings (large, very translucent)
  const RING_COLS = [0x00d4ff, 0x7b2fff, 0x00aaff];
  const rings = [];
  [20, 27, 34].forEach((r, i) => {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(r, .06, 6, 100),
      new THREE.MeshBasicMaterial({ color:RING_COLS[i], transparent:true, opacity:.1, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    mesh.rotation.x = .4 + i*.55; mesh.rotation.z = i*.7;
    rings.push(mesh); scene.add(mesh);
  });

  // ── Shooting streaks
  const shooters = [];
  let shootTimer = 0;
  function spawnShooter() {
    const pts = [new THREE.Vector3(0,0,0), new THREE.Vector3(5+Math.random()*7, -.8, 0)];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:0xaaddff, transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    line.position.set((Math.random()-.5)*90, (Math.random()-.5)*55, (Math.random()-.5)*15);
    line.userData = { vx:-(2+Math.random()*3), vy:-.4, life:1 };
    scene.add(line); shooters.push({line,geo,mat});
  }

  let heroT = 0, cx = 0, cy = 0;
  (function render() {
    requestAnimationFrame(render); heroT += .012;
    arcTimer += .016; shootTimer += .016;
    if (arcTimer > .75) { arcTimer = 0; spawnArc(); }
    if (shootTimer > 4)  { shootTimer = 0; spawnShooter(); }

    nodes.forEach(n => {
      const u = n.userData;
      n.position.x = u.base.x + Math.sin(heroT*u.spd + u.phase) * 1.3;
      n.position.y = u.base.y + Math.cos(heroT*u.spd*.7 + u.phase) * 1.1;
      n.scale.setScalar(.7 + .3*Math.sin(heroT*2 + u.pp));
    });
    conns.forEach(({line,a,b}) => {
      const p = line.geometry.attributes.position;
      p.setXYZ(0,a.position.x,a.position.y,a.position.z);
      p.setXYZ(1,b.position.x,b.position.y,b.position.z);
      p.needsUpdate = true;
    });
    rings.forEach((r,i) => { r.rotation.y += .003*(i+1)*.5; r.rotation.x += .002*(i+1)*.3; });

    for (let i = shooters.length-1; i>=0; i--) {
      const ss = shooters[i];
      ss.line.position.x += ss.line.userData.vx*.4;
      ss.line.position.y += ss.line.userData.vy*.4;
      ss.line.userData.life -= .018;
      ss.line.material.opacity = ss.line.userData.life;
      if (ss.line.userData.life <= 0) { scene.remove(ss.line); ss.geo.dispose(); ss.mat.dispose(); shooters.splice(i,1); }
    }

    cx += (gMouseX*5 - cx)*.04; cy += (-gMouseY*3 - cy)*.04;
    camera.position.x = cx; camera.position.y = cy;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 2 ─ ABOUT: Gentle rotating torus rings — very subtle
// ══════════════════════════════════════════════════════════════
(function aboutScene() {
  const s = buildScene('about-canvas', 65, 50);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Sparse dark background dust — very small, very dim
  const DUST = 600;
  const dPos = new Float32Array(DUST*3);
  for (let i = 0; i < DUST; i++) {
    dPos[i*3]=(Math.random()-.5)*120; dPos[i*3+1]=(Math.random()-.5)*90; dPos[i*3+2]=(Math.random()-.5)*30;
  }
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute('position', new THREE.BufferAttribute(dPos,3));
  scene.add(new THREE.Points(dGeo, new THREE.PointsMaterial({
    color:0x002244, size:.14, transparent:true, opacity:.35,
    blending:THREE.AdditiveBlending, depthWrite:false
  })));

  // Large, very translucent torus rings — behind the content
  const ringDefs = [
    { r:22, hue:.60, op:.06, rx:.8,  rz:.3  },
    { r:30, hue:.62, op:.04, rx:1.2, rz:1.0 },
    { r:38, hue:.58, op:.03, rx:.4,  rz:1.8 },
  ];
  const rings = ringDefs.map(d => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, .08, 6, 120),
      new THREE.MeshBasicMaterial({ color:new THREE.Color().setHSL(d.hue,1,.55), transparent:true, opacity:d.op, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    m.rotation.x = d.rx; m.rotation.z = d.rz;
    scene.add(m); return m;
  });

  // Single wireframe icosphere as a far background accent
  const icoGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(12, 1));
  const ico = new THREE.LineSegments(icoGeo, new THREE.LineBasicMaterial({
    color:0x003366, transparent:true, opacity:.08, blending:THREE.AdditiveBlending, depthWrite:false
  }));
  ico.position.set(30, -5, -15);
  scene.add(ico);

  let t = 0, cx = 0, cy = 0;
  (function render() {
    requestAnimationFrame(render); t += .007;
    rings[0].rotation.y += .0025; rings[0].rotation.x += .001;
    rings[1].rotation.y -= .0018; rings[1].rotation.z += .0012;
    rings[2].rotation.y += .0015; rings[2].rotation.x -= .0008;
    ico.rotation.y = t*.08; ico.rotation.x = t*.05;
    cx += (gMouseX*2 - cx)*.025; cy += (-gMouseY*1.5 - cy)*.025;
    camera.position.x = cx; camera.position.y = cy;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 3 ─ SKILLS: Floating neural network — dim, behind grid
// ══════════════════════════════════════════════════════════════
(function skillsScene() {
  const s = buildScene('skills-canvas', 60, 60);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Dim node network — very small nodes, very low opacity lines
  const N = 28;
  const nodeG = new THREE.SphereGeometry(.25, 6, 6);
  const nodes = [];
  for (let i = 0; i < N; i++) {
    const hue = .55 + Math.random()*.2;
    const m = new THREE.Mesh(nodeG, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(hue,1,.6), transparent:true, opacity:.45,
      blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.position.set((Math.random()-.5)*80, (Math.random()-.5)*55, (Math.random()-.5)*15);
    m.userData = { vx:(Math.random()-.5)*.03, vy:(Math.random()-.5)*.03, phase:Math.random()*Math.PI*2 };
    nodes.push(m); scene.add(m);
  }
  // Sparse connections
  const lMat = new THREE.LineBasicMaterial({ color:0x001a44, transparent:true, opacity:.12, blending:THREE.AdditiveBlending, depthWrite:false });
  const conns = [];
  nodes.forEach((a,i) => nodes.slice(i+1).forEach(b => {
    if (a.position.distanceTo(b.position) < 28 && Math.random() > .65 && conns.length < 50) {
      const g = new THREE.BufferGeometry().setFromPoints([a.position.clone(), b.position.clone()]);
      conns.push({l:new THREE.Line(g,lMat.clone()),a,b}); scene.add(conns[conns.length-1].l);
    }
  }));

  // Large wireframe octahedron — far back, very dim
  const octWf = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.OctahedronGeometry(20,0)),
    new THREE.LineBasicMaterial({ color:0x001133, transparent:true, opacity:.07, blending:THREE.AdditiveBlending, depthWrite:false })
  );
  octWf.position.set(-25, 0, -20); scene.add(octWf);

  let t = 0;
  (function render() {
    requestAnimationFrame(render); t += .01;
    nodes.forEach(n => {
      n.position.x += n.userData.vx; n.position.y += n.userData.vy;
      if (Math.abs(n.position.x) > 40) n.userData.vx *= -1;
      if (Math.abs(n.position.y) > 28) n.userData.vy *= -1;
      n.material.opacity = .3 + .15*Math.sin(t*1.5 + n.userData.phase);
    });
    conns.forEach(({l,a,b}) => {
      const p = l.geometry.attributes.position;
      p.setXYZ(0,a.position.x,a.position.y,a.position.z);
      p.setXYZ(1,b.position.x,b.position.y,b.position.z);
      p.needsUpdate = true;
    });
    octWf.rotation.y = t*.04; octWf.rotation.x = t*.03;
    camera.position.x += (gMouseX*2 - camera.position.x)*.02;
    camera.position.y += (-gMouseY*1.5 - camera.position.y)*.02;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 4 ─ PROJECTS: Falling data rain — elegant & slim
// ══════════════════════════════════════════════════════════════
(function projectsScene() {
  const s = buildScene('proj-canvas', 65, 75);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Slim vertical data streams
  const STREAM_N = 35;
  const palettes = [0x003366, 0x001a44, 0x002255, 0x001133, 0x0a0a2a];
  const streams = [];
  for (let l = 0; l < STREAM_N; l++) {
    const x = (Math.random()-.5)*160;
    const pts = [];
    const seg = 30 + Math.floor(Math.random()*25);
    for (let p = 0; p < seg; p++) pts.push(new THREE.Vector3(x + (Math.random()-.5)*.8, 100-p*3.5, (Math.random()-.5)*6));
    const mat = new THREE.LineBasicMaterial({
      color: palettes[Math.floor(Math.random()*palettes.length)],
      transparent:true, opacity:.05 + Math.random()*.09,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    ln.userData = { spd:.22+Math.random()*.35 };
    streams.push(ln); scene.add(ln);
  }

  // 3 floating wireframe shapes — placed at edges, very dim
  const shapes = [
    { geo: new THREE.OctahedronGeometry(7,0), color:0x002244, x:-38, y:10,  z:-20 },
    { geo: new THREE.IcosahedronGeometry(6,0), color:0x001a33, x: 40, y:-8,  z:-18 },
    { geo: new THREE.TetrahedronGeometry(8,0), color:0x002233, x:-10, y:-18, z:-25 },
  ];
  const floaters = shapes.map(d => {
    const obj = new THREE.LineSegments(
      new THREE.WireframeGeometry(d.geo),
      new THREE.LineBasicMaterial({ color:d.color, transparent:true, opacity:.12, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    obj.position.set(d.x, d.y, d.z);
    obj.userData = { rx:(Math.random()-.5)*.007, ry:(Math.random()-.5)*.009, baseY:d.y, fph:Math.random()*Math.PI*2, fsp:.3+Math.random()*.3 };
    scene.add(obj); return obj;
  });

  let t = 0;
  (function render() {
    requestAnimationFrame(render); t += .012;
    streams.forEach(s => { s.position.y -= s.userData.spd; if (s.position.y < -180) s.position.y = 0; });
    floaters.forEach(f => {
      f.rotation.x += f.userData.rx; f.rotation.y += f.userData.ry;
      f.position.y = f.userData.baseY + Math.sin(t*f.userData.fsp + f.userData.fph)*2.5;
    });
    camera.position.x += (gMouseX*4 - camera.position.x)*.018;
    camera.position.y += (-gMouseY*2.5 - camera.position.y)*.018;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 5 ─ PUBLICATIONS: DNA Double Helix — elegant purple
// ══════════════════════════════════════════════════════════════
(function pubScene() {
  const s = buildScene('pub-canvas', 60, 55);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Background sparse dust — dark purple
  const DUST = 500;
  const dp = new Float32Array(DUST*3);
  for (let i=0;i<DUST;i++) { dp[i*3]=(Math.random()-.5)*110; dp[i*3+1]=(Math.random()-.5)*80; dp[i*3+2]=(Math.random()-.5)*30; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp,3));
  scene.add(new THREE.Points(dg, new THREE.PointsMaterial({ color:0x1a0033, size:.12, transparent:true, opacity:.35, blending:THREE.AdditiveBlending, depthWrite:false })));

  // DNA helix — placed to the RIGHT side, out of the way of left-side text
  const helixGroup = new THREE.Group();
  helixGroup.position.set(28, 0, -8);   // offset to right
  scene.add(helixGroup);

  const STEPS = 55, H = 36, R = 5.5;
  const s1 = [], s2 = [];
  const sGeo = new THREE.SphereGeometry(.22, 7, 7);

  for (let i = 0; i < STEPS; i++) {
    const t  = i/STEPS;
    const ang = t*Math.PI*4;
    const y   = (t-.5)*H;

    const p1 = new THREE.Vector3(Math.cos(ang)*R,   y, Math.sin(ang)*R);
    const p2 = new THREE.Vector3(Math.cos(ang+Math.PI)*R, y, Math.sin(ang+Math.PI)*R);
    s1.push(p1); s2.push(p2);

    // Node spheres
    [p1,p2].forEach((p,si) => {
      const m = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(.68+si*.06+t*.08,1,.65),
        transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false
      }));
      m.position.copy(p); helixGroup.add(m);
    });

    // Rungs
    if (i % 3 === 0) {
      helixGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([p1.clone(), p2.clone()]),
        new THREE.LineBasicMaterial({ color:0x6600cc, transparent:true, opacity:.3, blending:THREE.AdditiveBlending, depthWrite:false })
      ));
    }
  }

  // Strand curves
  [s1,s2].forEach((arr,ci) => {
    const curve = new THREE.CatmullRomCurve3(arr);
    helixGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(180)),
      new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.67+ci*.07,1,.55), transparent:true, opacity:.45, blending:THREE.AdditiveBlending, depthWrite:false })
    ));
  });

  // Faint orbiting particles
  const orbN = 25, orbGeo = new THREE.SphereGeometry(.14,5,5);
  const orbs = [];
  for (let i=0;i<orbN;i++) {
    const m = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(.7+Math.random()*.15,1,.75), transparent:true, opacity:.6, blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.userData = { t:Math.random(), spd:.002+Math.random()*.002, ro:R+2.5+Math.random()*2.5, ao:Math.random()*Math.PI*2 };
    orbs.push(m); helixGroup.add(m);
  }

  let t = 0;
  (function render() {
    requestAnimationFrame(render); t += .008;
    helixGroup.rotation.y = t*.12;
    helixGroup.position.y = Math.sin(t*.3)*2;
    orbs.forEach(o => {
      o.userData.t = (o.userData.t + o.userData.spd) % 1;
      const ang = o.userData.t*Math.PI*4 + o.userData.ao;
      const y   = (o.userData.t-.5)*H;
      o.position.set(Math.cos(ang)*o.userData.ro, y, Math.sin(ang)*o.userData.ro);
      o.material.opacity = .35 + .25*Math.sin(t*3 + o.userData.t*10);
    });
    camera.position.x += (gMouseX*3 - camera.position.x)*.02;
    camera.position.y += (-gMouseY*2 - camera.position.y)*.02;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 6 ─ CERTIFICATIONS: Circuit board — subtle teal grid
// ══════════════════════════════════════════════════════════════
(function certScene() {
  const s = buildScene('certifications-canvas', 60, 55);
  if (!s) return;
  const { renderer, scene, camera } = s;
  camera.position.set(0, 18, 55); camera.lookAt(0,0,0);

  const COL = 0x004422; // deep teal
  const traceGroup = new THREE.Group();
  scene.add(traceGroup);

  const W = 90, H = 55;

  function traceMat(op = .12) {
    return new THREE.LineBasicMaterial({ color:COL, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false });
  }

  // Horizontal traces
  for (let r = 0; r < 14; r++) {
    if (Math.random() < .55) {
      const y  = (r/13-.5)*H;
      const x1 = (Math.random()-.5)*W, x2 = (Math.random()-.5)*W;
      traceGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.min(x1,x2),y,0), new THREE.Vector3(Math.max(x1,x2),y,0)]),
        traceMat()
      ));
    }
  }
  // Vertical traces
  for (let c = 0; c < 20; c++) {
    if (Math.random() < .45) {
      const x  = (c/19-.5)*W;
      const y1 = (Math.random()-.5)*H, y2 = (Math.random()-.5)*H;
      traceGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,Math.min(y1,y2),0), new THREE.Vector3(x,Math.max(y1,y2),0)]),
        traceMat()
      ));
    }
  }
  // L-bends
  for (let k = 0; k < 18; k++) {
    const x1=(Math.random()-.5)*W, y1=(Math.random()-.5)*H;
    const x2=x1+(Math.random()-.5)*22, y2=y1+(Math.random()-.5)*16;
    traceGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1,y1,0), new THREE.Vector3(x2,y1,0), new THREE.Vector3(x2,y2,0)]),
      traceMat(.08 + Math.random()*.08)
    ));
  }

  // Pads
  const padGeo = new THREE.CircleGeometry(.4, 8);
  const pulsingPads = [];
  for (let i = 0; i < 35; i++) {
    const px = (Math.random()-.5)*W, py = (Math.random()-.5)*H;
    const padMat = new THREE.MeshBasicMaterial({ color:0x00ff88, transparent:true, opacity:.35, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(px,py,0);
    pad.userData = { phase: Math.random()*Math.PI*2 };
    pulsingPads.push(pad); traceGroup.add(pad);

    // ring
    const rMat = new THREE.MeshBasicMaterial({ color:0x00cc66, transparent:true, opacity:.12, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(.5,.65,12), rMat);
    ring.position.set(px,py,0); traceGroup.add(ring);
  }

  // Signal dots
  const sigDots = [];
  for (let k = 0; k < 6; k++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(.28,5,5),
      new THREE.MeshBasicMaterial({ color:0x00ff88, transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    m.userData = { x:(Math.random()-.5)*W, y:(Math.random()-.5)*H, tx:(Math.random()-.5)*W, t:Math.random(), spd:.15+Math.random()*.25 };
    sigDots.push(m); traceGroup.add(m);
  }

  let certT = 0;
  (function render() {
    requestAnimationFrame(render); certT += .009;
    traceGroup.rotation.x = -.22 + Math.sin(certT*.12)*.04;
    traceGroup.rotation.y = Math.sin(certT*.08)*.06;
    pulsingPads.forEach(p => {
      const s = .75 + .3*Math.sin(certT*1.8 + p.userData.phase);
      p.scale.setScalar(s);
      p.material.opacity = .2 + .2*Math.sin(certT*1.8 + p.userData.phase);
    });
    sigDots.forEach(d => {
      d.userData.t += d.userData.spd*.014;
      if (d.userData.t > 1) { d.userData.t=0; d.userData.x=d.userData.tx; d.userData.tx=(Math.random()-.5)*W; }
      d.position.x = d.userData.x + (d.userData.tx - d.userData.x)*d.userData.t;
      d.position.y = d.userData.y;
    });
    camera.position.x += (gMouseX*3 - camera.position.x)*.018;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 7 ─ CONTACT: Rotating Earth with arc connections
// ══════════════════════════════════════════════════════════════
(function contactScene() {
  const s = buildScene('contact-canvas', 55, 52);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Stars
  const STAR_N = 1200;
  const sPa = new Float32Array(STAR_N*3), sCa = new Float32Array(STAR_N*3);
  for (let i=0;i<STAR_N;i++) {
    sPa[i*3]=(Math.random()-.5)*280; sPa[i*3+1]=(Math.random()-.5)*200; sPa[i*3+2]=-60-Math.random()*80;
    const c=new THREE.Color().setHSL(.58+Math.random()*.1,.4,.65+Math.random()*.25);
    sCa[i*3]=c.r; sCa[i*3+1]=c.g; sCa[i*3+2]=c.b;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPa,3));
  sGeo.setAttribute('color', new THREE.BufferAttribute(sCa,3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ size:.22, vertexColors:true, transparent:true, opacity:.55, blending:THREE.AdditiveBlending, depthWrite:false })));

  const GLOBE_R = 17;
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Lat/lon grid
  const gridMat = new THREE.LineBasicMaterial({ color:0x003366, transparent:true, opacity:.1, blending:THREE.AdditiveBlending, depthWrite:false });

  [-60,-30,0,30,60].forEach(lat => {
    const lt = lat*Math.PI/180, coslt = Math.cos(lt);
    const pts = [];
    for (let i=0;i<=64;i++) { const th=i/64*Math.PI*2; pts.push(new THREE.Vector3(GLOBE_R*coslt*Math.cos(th), GLOBE_R*Math.sin(lt), GLOBE_R*coslt*Math.sin(th))); }
    globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat.clone()));
  });
  for (let lon=0;lon<360;lon+=30) {
    const ln = lon*Math.PI/180;
    const pts = [];
    for (let i=0;i<=32;i++) { const la=i/32*Math.PI-Math.PI/2; pts.push(new THREE.Vector3(GLOBE_R*Math.cos(la)*Math.cos(ln), GLOBE_R*Math.sin(la), GLOBE_R*Math.cos(la)*Math.sin(ln))); }
    globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat.clone()));
  }

  // Dot field on surface
  const dotG = new THREE.SphereGeometry(.13,5,5);
  for (let i=0;i<280;i++) {
    const phi=Math.acos(-1+2*i/280), th=Math.sqrt(280*Math.PI)*phi;
    const m = new THREE.Mesh(dotG, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(.58+i/280*.1,1,.65), transparent:true, opacity:.55, blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.position.setFromSphericalCoords(GLOBE_R, phi, th);
    globeGroup.add(m);
  }

  // Atmosphere glow
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_R*1.1,32,32),
    new THREE.MeshBasicMaterial({ color:0x0044aa, transparent:true, opacity:.045, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.BackSide })
  ));

  // Animated arc connections
  const arcGroup = new THREE.Group(); globeGroup.add(arcGroup);
  let arcTimer = 0;
  function spawnArc() {
    const rPt = () => { const ph=Math.acos(-1+Math.random()*2), th=Math.random()*Math.PI*2; return new THREE.Vector3().setFromSphericalCoords(GLOBE_R, ph, th); };
    const a = rPt(), b = rPt();
    const mid = new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);
    mid.normalize().multiplyScalar(GLOBE_R*(1.25+Math.random()*.25));
    const pts = new THREE.QuadraticBezierCurve3(a,mid,b).getPoints(38);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.57+Math.random()*.1,1,.72), transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    arcGroup.add(line);
    let life=0; const maxL=2.5+Math.random()*1.5;
    const tick = () => {
      life += .016;
      const p = life/maxL;
      mat.opacity = p<.25 ? (p/.25)*.5 : p>.75 ? ((1-p)/.25)*.5 : .5;
      if (life < maxL) requestAnimationFrame(tick);
      else { arcGroup.remove(line); geo.dispose(); mat.dispose(); }
    };
    tick();
  }

  let contT = 0;
  (function render() {
    requestAnimationFrame(render); contT += .01; arcTimer += .016;
    if (arcTimer > 2) { arcTimer = 0; spawnArc(); }
    globeGroup.rotation.y += .0028;
    globeGroup.rotation.x = Math.sin(contT*.18)*.07;
    camera.position.x += (gMouseX*4 - camera.position.x)*.022;
    camera.position.y += (-gMouseY*2.5 - camera.position.y)*.022;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ════ AUDIO ══════════════════════════════════════════════════
class SoundManager {
  constructor() { this.ctx = null; this.enabled = true; }
  init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); if (this.ctx.state==='suspended') this.ctx.resume(); }
  toggle() { this.enabled = !this.enabled; return this.enabled; }
  playTone(freq, type, dur, vol) {
    if (!this.enabled || !this.ctx) return;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime+dur);
    o.connect(g); g.connect(this.ctx.destination); o.start(); o.stop(this.ctx.currentTime+dur);
  }
  hover() { this.playTone(800,'sine',.05,.05); }
  click() { this.playTone(400,'sine',.15,.1); }
  termEnter() { this.playTone(300,'triangle',.1,.08); }
  navSweep() {
    if (!this.enabled||!this.ctx) return;
    const o=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.frequency.setValueAtTime(200,this.ctx.currentTime); o.frequency.exponentialRampToValueAtTime(800,this.ctx.currentTime+.2);
    g.gain.setValueAtTime(.05,this.ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2);
    o.connect(g); g.connect(this.ctx.destination); o.start(); o.stop(this.ctx.currentTime+.2);
  }
}
const sm = new SoundManager();
document.addEventListener('click', () => sm.init(), { once: true });
document.addEventListener('keydown', () => sm.init(), { once: true });
const soundToggle = document.getElementById('sound-toggle');
if (soundToggle) {
  soundToggle.addEventListener('click', e => {
    e.preventDefault(); sm.init();
    const on = sm.toggle();
    soundToggle.classList.toggle('muted', !on);
    soundToggle.innerText = on ? '🔊' : '🔇';
    if (on) sm.click();
  });
}
document.querySelectorAll('a, button, .proj-card, .skill-box').forEach(el => {
  if (el.id==='sound-toggle') return;
  el.addEventListener('mouseenter', () => sm.hover());
});
document.querySelectorAll('a, button:not(.nav-open-btn):not(.nav-close-btn):not(#sound-toggle)').forEach(el => el.addEventListener('click', () => sm.click()));
navOpenBtn?.addEventListener('click',  () => sm.navSweep());
navCloseBtn?.addEventListener('click', () => sm.navSweep());

// ════ TERMINAL ════════════════════════════════════════════════
const termBtn = document.getElementById('terminal-btn');
const termModal = document.getElementById('terminal-modal');
const termClose = document.getElementById('term-close');
const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');

function toggleTerminal() {
  termModal.classList.toggle('open');
  if (termModal.classList.contains('open')) {
    setTimeout(() => termInput.focus(), 100);
  } else {
    termInput.blur();
  }
}

termBtn?.addEventListener('click', toggleTerminal);
termClose?.addEventListener('click', toggleTerminal);

// Toggle terminal with backtick (`)
document.addEventListener('keydown', e => {
  if (e.key === '`') {
    e.preventDefault();
    toggleTerminal();
  }
});

// Terminal commands logic
const COMMANDS = {
  help: () => `Available commands:
  - <b>about</b>: Learn more about me.
  - <b>skills</b>: View my technical skills.
  - <b>projects</b>: Check out my work.
  - <b>contact</b>: Get my contact information.
  - <b>resume</b>: View or download my resume.
  - <b>clear</b>: Clear the terminal.`,
  about: () => `I am K. Mani Vignesh, a Full-Stack Developer & AI-ML Engineer studying at Amrita Vishwa Vidyapeetham.`,
  skills: () => `Languages: Python, Java, JavaScript, SQL
Web: React, Node.js, Express, Django, HTML/CSS
AI/ML: Scikit-learn, TensorFlow, PyTorch, YOLO
Databases: MongoDB, SQL, Oracle
Cloud: AWS, Docker, Git`,
  projects: () => `My featured projects include:
- YuktiJobs (Job Portal)
- Zero Waste (Food Donation Platform)
- GrievAI (Grievance NLP System)
- AgriFusionNet (Paddy Disease Detection)
...and more! Type 'help' for other commands.`,
  contact: () => `Email: kmvignesh2005@gmail.com
LinkedIn: mani-vignesh-kothuri
GitHub: kmanivignesh`,
  resume: () => `You can view or download my resume here: <a href="Mani_Vignesh_Resume.pdf" target="_blank" style="color: var(--cyan); text-decoration: underline;">Mani_Vignesh_Resume.pdf</a>`,
  clear: () => {
    termBody.innerHTML = '';
    return null;
  }
};

termInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (typeof sm !== 'undefined') sm.termEnter();
    const val = termInput.value.trim();
    termInput.value = '';

    // Echo input
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="term-prompt">visitor@mani-portfolio:~$</span> ${val}`;
    termBody.appendChild(echoLine);

    if (val) {
      const cmd = val.toLowerCase();
      const res = document.createElement('div');
      res.className = 'term-line';
      
      if (COMMANDS[cmd]) {
        const out = COMMANDS[cmd]();
        if (out !== null) {
          res.innerHTML = out.replace(/\n/g, '<br>');
          termBody.appendChild(res);
        }
      } else {
        res.innerHTML = `<span class="term-err">Command not found: ${val}. Type 'help' to see available commands.</span>`;
        termBody.appendChild(res);
      }
    }
    termBody.scrollTop = termBody.scrollHeight;
  }
});

/* ================================================================
   K. MANI VIGNESH PORTFOLIO — main.js
   Premium Three.js 3D Backgrounds — immersive, fluid, atmospheric
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
  tx += (mx - tx) * .11; ty += (my - ty) * .11;
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
    el.style.animationDuration = '1s';
    el.style.animationFillMode = 'both';
    el.style.animationTimingFunction = 'cubic-bezier(.16,1,.3,1)';
  });
}
const heroStyle = document.createElement('style');
heroStyle.textContent = `
  @keyframes heroIn { from{opacity:0;transform:translateY(50px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
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

// ════ SCROLL REVEAL — Enhanced with staggering ═══════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => revealObs.observe(el));

// Stagger grid children
document.querySelectorAll('.skills-grid, .proj-cards-grid, .pub-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.setProperty('--d', `${i * 0.08}s`);
    revealObs.observe(child);
  });
});

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

// ════ CARD 3D TILT — Enhanced with smoother easing ═══════════
function addTilt(selector, maxDeg = 8) {
  document.querySelectorAll(selector).forEach(card => {
    let targetRx = 0, targetRy = 0, currentRx = 0, currentRy = 0;
    let tiltFrame;

    function updateTilt() {
      currentRx += (targetRx - currentRx) * 0.08;
      currentRy += (targetRy - currentRy) * 0.08;
      card.style.transform = `perspective(900px) translateY(-6px) rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;
      if (Math.abs(targetRx - currentRx) > 0.01 || Math.abs(targetRy - currentRy) > 0.01) {
        tiltFrame = requestAnimationFrame(updateTilt);
      }
    }

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      targetRx = -y * maxDeg;
      targetRy = x * maxDeg;

      // Mouse glow position for ::after pseudo
      const px = ((e.clientX - r.left) / r.width * 100);
      const py = ((e.clientY - r.top)  / r.height * 100);
      card.style.setProperty('--mx', px + '%');
      card.style.setProperty('--my', py + '%');

      card.style.transition = 'box-shadow .3s, border-color .3s';
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(updateTilt);
    });
    card.addEventListener('mouseleave', () => {
      targetRx = 0; targetRy = 0;
      card.style.transition = 'all .5s cubic-bezier(.16,1,.3,1)';
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(function reset() {
        currentRx += (0 - currentRx) * 0.06;
        currentRy += (0 - currentRy) * 0.06;
        card.style.transform = `perspective(900px) translateY(0) rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;
        if (Math.abs(currentRx) > 0.05 || Math.abs(currentRy) > 0.05) {
          tiltFrame = requestAnimationFrame(reset);
        } else {
          card.style.transform = '';
          card.style.transition = '';
        }
      });
    });
  });
}
addTilt('.skill-box', 12);
addTilt('.proj-card', 7);
addTilt('.pub-card',  7);

// ════ TEXT SCRAMBLE ════════════════════════════════════════════
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
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
  }, 25);
}
document.querySelectorAll('.hn-first, .hn-last').forEach(el => el.addEventListener('mouseenter', () => scramble(el)));

// ════ MAGNETIC BUTTONS ═══════════════════════════════════════
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'all .4s cubic-bezier(.16,1,.3,1)';
    setTimeout(() => btn.style.transition = '', 400);
  });
});

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

// ════════════════════════════════════════════════════════════
//  VISIBILITY-BASED RENDERING (performance optimization)
// ════════════════════════════════════════════════════════════
const sectionVisible = {};
const visObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    sectionVisible[e.target.id] = e.isIntersecting;
  });
}, { threshold: 0, rootMargin: '100px' });
document.querySelectorAll('section').forEach(s => {
  sectionVisible[s.id] = false;
  visObs.observe(s);
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

// Smooth lerp helper
function lerp(a, b, t) { return a + (b - a) * t; }

// ══════════════════════════════════════════════════════════════
// SCENE 1 ─ HERO: Galaxy Particle Field with Spiral + Glow Core
// ══════════════════════════════════════════════════════════════
(function heroScene() {
  const s = buildScene('hero-canvas', 60, 48);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // ── Deep-field stars with depth-based sizing
  const STARS = 3500;
  const sPos = new Float32Array(STARS * 3);
  const sCol = new Float32Array(STARS * 3);
  const sSz  = new Float32Array(STARS);
  for (let i = 0; i < STARS; i++) {
    const x = (Math.random()-.5)*200;
    const y = (Math.random()-.5)*140;
    const z = (Math.random()-.5)*80;
    sPos[i*3] = x; sPos[i*3+1] = y; sPos[i*3+2] = z;
    const depth = (z + 40) / 80; // 0 = far, 1 = near
    const hue = .55 + Math.random()*.2;
    const c = new THREE.Color().setHSL(hue, .7 + depth*.3, .45 + depth*.4);
    sCol[i*3]=c.r; sCol[i*3+1]=c.g; sCol[i*3+2]=c.b;
    sSz[i] = .08 + depth * .25 + Math.random() * .1;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute('color',    new THREE.BufferAttribute(sCol, 3));
  sGeo.setAttribute('size',     new THREE.BufferAttribute(sSz,  1));
  const starField = new THREE.Points(sGeo, new THREE.PointsMaterial({
    size: .22, vertexColors: true, transparent: true, opacity: .6,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  }));
  scene.add(starField);

  // ── Constellation nodes
  const NODE_N = 65;
  const nodeGeo = new THREE.SphereGeometry(.2, 10, 10);
  const nodes = [];
  for (let i = 0; i < NODE_N; i++) {
    const hue = .53 + Math.random()*.22;
    const mesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(hue, 1, .7), transparent: true, opacity: .85,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    const r = 7 + Math.random()*24;
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    mesh.position.set(r*Math.sin(ph)*Math.cos(th), r*Math.sin(ph)*Math.sin(th), r*Math.cos(ph));
    mesh.userData = { base: mesh.position.clone(), phase: Math.random()*Math.PI*2, spd: .2+Math.random()*.45, pp: Math.random()*Math.PI*2 };
    nodes.push(mesh); scene.add(mesh);
  }

  // ── Connection lines
  const connMat = new THREE.LineBasicMaterial({ color:0x0066dd, transparent:true, opacity:.14, blending:THREE.AdditiveBlending, depthWrite:false });
  const conns = [];
  for (let i = 0; i < NODE_N; i++) {
    for (let j = i+1; j < NODE_N; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 14 && conns.length < 120) {
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
    for (let k = 0; k <= 16; k++) {
      const t = k/16;
      const p = new THREE.Vector3().lerpVectors(pick.a.position, pick.b.position, t);
      p.x += (Math.random()-.5)*2*Math.sin(t*Math.PI);
      p.y += (Math.random()-.5)*2*Math.sin(t*Math.PI);
      pts.push(p);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.53+Math.random()*.18,1,.82), transparent:true, opacity:.9, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    let life = 0;
    const step = () => { life += .016; mat.opacity = .9*(1-life/.5); if (life < .5) requestAnimationFrame(step); else { scene.remove(line); geo.dispose(); mat.dispose(); } };
    step();
  }

  // ── Orbiting rings with glow
  const RING_COLS = [0x06d6f2, 0x8b5cf6, 0x3b82f6];
  const rings = [];
  [20, 28, 36].forEach((r, i) => {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(r, .07, 8, 128),
      new THREE.MeshBasicMaterial({ color:RING_COLS[i], transparent:true, opacity:.08, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    mesh.rotation.x = .4 + i*.55; mesh.rotation.z = i*.7;
    rings.push(mesh); scene.add(mesh);
  });

  // ── Pulsating glow core
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x06d6f2, transparent: true, opacity: .04,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const core = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), coreMat);
  scene.add(core);
  const coreOuter = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .02, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide })
  );
  scene.add(coreOuter);

  // ── Bloom particles (larger, softer glow dots)
  const BLOOM_N = 20;
  const bloomGeo = new THREE.SphereGeometry(.5, 8, 8);
  const blooms = [];
  for (let i = 0; i < BLOOM_N; i++) {
    const m = new THREE.Mesh(bloomGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(.55+Math.random()*.15, 1, .75),
      transparent: true, opacity: .08 + Math.random()*.06,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    m.position.set((Math.random()-.5)*50, (Math.random()-.5)*35, (Math.random()-.5)*20);
    m.userData = { phase: Math.random()*Math.PI*2, spd: .3+Math.random()*.5 };
    blooms.push(m); scene.add(m);
  }

  // ── Shooting streaks
  const shooters = [];
  let shootTimer = 0;
  function spawnShooter() {
    const pts = [new THREE.Vector3(0,0,0), new THREE.Vector3(6+Math.random()*8, -.8, 0)];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:0xbbddff, transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    line.position.set((Math.random()-.5)*100, (Math.random()-.5)*60, (Math.random()-.5)*15);
    line.userData = { vx:-(2.5+Math.random()*3.5), vy:-.5, life:1 };
    scene.add(line); shooters.push({line,geo,mat});
  }

  let heroT = 0, cx = 0, cy = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['hero']) return;
    heroT += .01;
    arcTimer += .016; shootTimer += .016;
    if (arcTimer > .6) { arcTimer = 0; spawnArc(); }
    if (shootTimer > 3.5) { shootTimer = 0; spawnShooter(); }

    // Slow spiral rotation on star field
    starField.rotation.z += .00015;
    starField.rotation.y += .0001;

    nodes.forEach(n => {
      const u = n.userData;
      n.position.x = u.base.x + Math.sin(heroT*u.spd + u.phase) * 1.5;
      n.position.y = u.base.y + Math.cos(heroT*u.spd*.7 + u.phase) * 1.2;
      n.scale.setScalar(.65 + .35*Math.sin(heroT*2 + u.pp));
    });
    conns.forEach(({line,a,b}) => {
      const p = line.geometry.attributes.position;
      p.setXYZ(0,a.position.x,a.position.y,a.position.z);
      p.setXYZ(1,b.position.x,b.position.y,b.position.z);
      p.needsUpdate = true;
    });
    rings.forEach((r,i) => { r.rotation.y += .0025*(i+1)*.5; r.rotation.x += .0015*(i+1)*.3; });

    // Breathing core
    const coreBreath = .03 + .015*Math.sin(heroT*1.2);
    coreMat.opacity = coreBreath;
    core.scale.setScalar(1 + .15*Math.sin(heroT*.8));
    coreOuter.scale.setScalar(1 + .1*Math.sin(heroT*.6 + 1));

    // Bloom pulses
    blooms.forEach(b => {
      b.material.opacity = .05 + .06*Math.sin(heroT*b.userData.spd + b.userData.phase);
      b.scale.setScalar(.8 + .4*Math.sin(heroT*b.userData.spd*.5 + b.userData.phase));
    });

    for (let i = shooters.length-1; i>=0; i--) {
      const ss = shooters[i];
      ss.line.position.x += ss.line.userData.vx*.4;
      ss.line.position.y += ss.line.userData.vy*.4;
      ss.line.userData.life -= .016;
      ss.line.material.opacity = ss.line.userData.life;
      if (ss.line.userData.life <= 0) { scene.remove(ss.line); ss.geo.dispose(); ss.mat.dispose(); shooters.splice(i,1); }
    }

    cx = lerp(cx, gMouseX*6, .03); cy = lerp(cy, -gMouseY*4, .03);
    camera.position.x = cx; camera.position.y = cy;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 2 ─ ABOUT: Morphing Geometry + Floating Shards
// ══════════════════════════════════════════════════════════════
(function aboutScene() {
  const s = buildScene('about-canvas', 65, 50);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Background dust
  const DUST = 800;
  const dPos = new Float32Array(DUST*3);
  for (let i = 0; i < DUST; i++) {
    dPos[i*3]=(Math.random()-.5)*140; dPos[i*3+1]=(Math.random()-.5)*100; dPos[i*3+2]=(Math.random()-.5)*40;
  }
  const dGeo = new THREE.BufferGeometry(); dGeo.setAttribute('position', new THREE.BufferAttribute(dPos,3));
  scene.add(new THREE.Points(dGeo, new THREE.PointsMaterial({
    color:0x002244, size:.15, transparent:true, opacity:.3,
    blending:THREE.AdditiveBlending, depthWrite:false
  })));

  // Translucent torus rings
  const ringDefs = [
    { r:22, hue:.58, op:.05, rx:.8,  rz:.3  },
    { r:30, hue:.60, op:.04, rx:1.2, rz:1.0 },
    { r:38, hue:.56, op:.03, rx:.4,  rz:1.8 },
  ];
  const rings = ringDefs.map(d => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, .09, 8, 140),
      new THREE.MeshBasicMaterial({ color:new THREE.Color().setHSL(d.hue,1,.5), transparent:true, opacity:d.op, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    m.rotation.x = d.rx; m.rotation.z = d.rz;
    scene.add(m); return m;
  });

  // Breathing wireframe icosphere as centerpiece
  const icoGeo = new THREE.IcosahedronGeometry(14, 1);
  const icoWire = new THREE.WireframeGeometry(icoGeo);
  const ico = new THREE.LineSegments(icoWire, new THREE.LineBasicMaterial({
    color:0x0066aa, transparent:true, opacity:.08, blending:THREE.AdditiveBlending, depthWrite:false
  }));
  ico.position.set(28, -5, -10);
  scene.add(ico);

  // Floating geometric shards
  const shardGeos = [
    new THREE.TetrahedronGeometry(2, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.IcosahedronGeometry(1.2, 0),
  ];
  const shards = [];
  for (let i = 0; i < 12; i++) {
    const geo = shardGeos[i % shardGeos.length];
    const wf = new THREE.WireframeGeometry(geo);
    const m = new THREE.LineSegments(wf, new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(.55 + Math.random()*.15, 1, .55),
      transparent: true, opacity: .12 + Math.random()*.08,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    m.position.set((Math.random()-.5)*80, (Math.random()-.5)*60, (Math.random()-.5)*20);
    m.userData = {
      rx: (Math.random()-.5)*.01, ry: (Math.random()-.5)*.012,
      baseY: m.position.y, phase: Math.random()*Math.PI*2, spd: .2+Math.random()*.4
    };
    shards.push(m); scene.add(m);
  }

  let t = 0, cx = 0, cy = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['about']) return;
    t += .007;
    rings[0].rotation.y += .002; rings[0].rotation.x += .001;
    rings[1].rotation.y -= .0015; rings[1].rotation.z += .001;
    rings[2].rotation.y += .0012; rings[2].rotation.x -= .0007;

    // Breathing icosphere
    ico.rotation.y = t*.1; ico.rotation.x = t*.06;
    const breathe = 1 + .08*Math.sin(t*1.5);
    ico.scale.setScalar(breathe);
    ico.material.opacity = .05 + .04*Math.sin(t*1.2);

    // Floating shards
    shards.forEach(s => {
      s.rotation.x += s.userData.rx;
      s.rotation.y += s.userData.ry;
      s.position.y = s.userData.baseY + Math.sin(t*s.userData.spd + s.userData.phase)*3;
    });

    cx = lerp(cx, gMouseX*2.5, .02); cy = lerp(cy, -gMouseY*1.8, .02);
    camera.position.x = cx; camera.position.y = cy;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 3 ─ SKILLS: Interactive Neural Web with Pulse Waves
// ══════════════════════════════════════════════════════════════
(function skillsScene() {
  const s = buildScene('skills-canvas', 60, 60);
  if (!s) return;
  const { renderer, scene, camera } = s;

  const N = 35;
  const nodeG = new THREE.SphereGeometry(.28, 8, 8);
  const nodes = [];
  for (let i = 0; i < N; i++) {
    const hue = .53 + Math.random()*.22;
    const m = new THREE.Mesh(nodeG, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(hue,1,.6), transparent:true, opacity:.4,
      blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.position.set((Math.random()-.5)*85, (Math.random()-.5)*60, (Math.random()-.5)*18);
    m.userData = { vx:(Math.random()-.5)*.025, vy:(Math.random()-.5)*.025, phase:Math.random()*Math.PI*2, baseOp: .35+Math.random()*.15 };
    nodes.push(m); scene.add(m);
  }
  // Connections
  const lMat = new THREE.LineBasicMaterial({ color:0x002255, transparent:true, opacity:.1, blending:THREE.AdditiveBlending, depthWrite:false });
  const conns = [];
  nodes.forEach((a,i) => nodes.slice(i+1).forEach(b => {
    if (a.position.distanceTo(b.position) < 30 && Math.random() > .6 && conns.length < 60) {
      const g = new THREE.BufferGeometry().setFromPoints([a.position.clone(), b.position.clone()]);
      conns.push({l:new THREE.Line(g,lMat.clone()),a,b}); scene.add(conns[conns.length-1].l);
    }
  }));

  // Large wireframe octahedron
  const octWf = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.OctahedronGeometry(22,0)),
    new THREE.LineBasicMaterial({ color:0x001144, transparent:true, opacity:.06, blending:THREE.AdditiveBlending, depthWrite:false })
  );
  octWf.position.set(-25, 0, -20); scene.add(octWf);

  // Pulse wave system
  const pulseRings = [];
  let pulseTimer = 0;
  function spawnPulse() {
    const sourceNode = nodes[Math.floor(Math.random()*nodes.length)];
    const ringGeo = new THREE.RingGeometry(.2, .4, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06d6f2, transparent: true, opacity: .5,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(sourceNode.position);
    ring.userData = { life: 0, maxLife: 2 };
    pulseRings.push(ring); scene.add(ring);
  }

  // Mouse position in 3D space for proximity
  let mouse3D = new THREE.Vector3(0, 0, 0);

  let t = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['skills']) return;
    t += .01;
    pulseTimer += .016;
    if (pulseTimer > 2.5) { pulseTimer = 0; spawnPulse(); }

    // Update mouse position in scene space
    mouse3D.set(gMouseX * 45, -gMouseY * 32, 0);

    nodes.forEach(n => {
      n.position.x += n.userData.vx; n.position.y += n.userData.vy;
      if (Math.abs(n.position.x) > 42) n.userData.vx *= -1;
      if (Math.abs(n.position.y) > 30) n.userData.vy *= -1;

      // Mouse proximity glow
      const dist = n.position.distanceTo(mouse3D);
      const proxFactor = Math.max(0, 1 - dist / 25);
      n.material.opacity = n.userData.baseOp + proxFactor * .5 + .1*Math.sin(t*1.5 + n.userData.phase);
      n.scale.setScalar(1 + proxFactor * .6);
    });
    conns.forEach(({l,a,b}) => {
      const p = l.geometry.attributes.position;
      p.setXYZ(0,a.position.x,a.position.y,a.position.z);
      p.setXYZ(1,b.position.x,b.position.y,b.position.z);
      p.needsUpdate = true;
      // Brighten connections near mouse
      const midX = (a.position.x + b.position.x)/2;
      const midY = (a.position.y + b.position.y)/2;
      const d = Math.sqrt((midX - mouse3D.x)**2 + (midY - mouse3D.y)**2);
      l.material.opacity = .08 + Math.max(0, 1 - d/30) * .2;
    });

    // Pulse waves
    for (let i = pulseRings.length-1; i >= 0; i--) {
      const pr = pulseRings[i];
      pr.userData.life += .016;
      const p = pr.userData.life / pr.userData.maxLife;
      pr.scale.setScalar(1 + p * 15);
      pr.material.opacity = .4 * (1 - p);
      if (p >= 1) { scene.remove(pr); pr.geometry.dispose(); pr.material.dispose(); pulseRings.splice(i, 1); }
    }

    octWf.rotation.y = t*.04; octWf.rotation.x = t*.03;
    camera.position.x = lerp(camera.position.x, gMouseX*3, .015);
    camera.position.y = lerp(camera.position.y, -gMouseY*2, .015);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 4 ─ PROJECTS: Data Rain + Holographic Grid
// ══════════════════════════════════════════════════════════════
(function projectsScene() {
  const s = buildScene('proj-canvas', 65, 75);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Slim vertical data streams
  const STREAM_N = 40;
  const palettes = [0x003366, 0x001a55, 0x002255, 0x001144, 0x0a0a30];
  const streams = [];
  for (let l = 0; l < STREAM_N; l++) {
    const x = (Math.random()-.5)*170;
    const pts = [];
    const seg = 30 + Math.floor(Math.random()*25);
    for (let p = 0; p < seg; p++) pts.push(new THREE.Vector3(x + (Math.random()-.5)*.8, 100-p*3.5, (Math.random()-.5)*6));
    const mat = new THREE.LineBasicMaterial({
      color: palettes[Math.floor(Math.random()*palettes.length)],
      transparent:true, opacity:.04 + Math.random()*.08,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    ln.userData = { spd:.2+Math.random()*.35 };
    streams.push(ln); scene.add(ln);
  }

  // Glowing droplet particles
  const DROP_N = 60;
  const dropGeo = new THREE.SphereGeometry(.12, 6, 6);
  const drops = [];
  for (let i = 0; i < DROP_N; i++) {
    const m = new THREE.Mesh(dropGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(.55+Math.random()*.1, 1, .7),
      transparent: true, opacity: .3+Math.random()*.3,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    m.position.set((Math.random()-.5)*150, (Math.random()-.5)*100, (Math.random()-.5)*8);
    m.userData = { spd: .3+Math.random()*.6, startY: m.position.y };
    drops.push(m); scene.add(m);
  }

  // Holographic grid floor
  const gridGroup = new THREE.Group();
  gridGroup.position.set(0, -35, -15);
  gridGroup.rotation.x = -Math.PI * .35;
  const gridMat = new THREE.LineBasicMaterial({ color: 0x002244, transparent: true, opacity: .06, blending: THREE.AdditiveBlending, depthWrite: false });
  const gridSize = 80, gridDiv = 20;
  for (let i = 0; i <= gridDiv; i++) {
    const pos = -gridSize/2 + (gridSize/gridDiv) * i;
    const h = [new THREE.Vector3(-gridSize/2, 0, pos), new THREE.Vector3(gridSize/2, 0, pos)];
    const v = [new THREE.Vector3(pos, 0, -gridSize/2), new THREE.Vector3(pos, 0, gridSize/2)];
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(h), gridMat.clone()));
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(v), gridMat.clone()));
  }
  scene.add(gridGroup);

  // 3 floating wireframe shapes
  const shapes = [
    { geo: new THREE.OctahedronGeometry(7,0), color:0x002244, x:-38, y:10,  z:-20 },
    { geo: new THREE.IcosahedronGeometry(6,0), color:0x001a33, x: 40, y:-8,  z:-18 },
    { geo: new THREE.TetrahedronGeometry(8,0), color:0x002233, x:-10, y:-18, z:-25 },
  ];
  const floaters = shapes.map(d => {
    const obj = new THREE.LineSegments(
      new THREE.WireframeGeometry(d.geo),
      new THREE.LineBasicMaterial({ color:d.color, transparent:true, opacity:.1, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    obj.position.set(d.x, d.y, d.z);
    obj.userData = { rx:(Math.random()-.5)*.006, ry:(Math.random()-.5)*.008, baseY:d.y, fph:Math.random()*Math.PI*2, fsp:.25+Math.random()*.3 };
    scene.add(obj); return obj;
  });

  let t = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['projects']) return;
    t += .012;
    streams.forEach(s => { s.position.y -= s.userData.spd; if (s.position.y < -180) s.position.y = 0; });

    // Falling droplets
    drops.forEach(d => {
      d.position.y -= d.userData.spd;
      if (d.position.y < -55) d.position.y = 55;
      d.material.opacity = .2 + .3*Math.abs(Math.sin(t + d.position.y*.05));
    });

    floaters.forEach(f => {
      f.rotation.x += f.userData.rx; f.rotation.y += f.userData.ry;
      f.position.y = f.userData.baseY + Math.sin(t*f.userData.fsp + f.userData.fph)*2.5;
    });

    // Subtle grid wave
    gridGroup.rotation.x = -Math.PI*.35 + Math.sin(t*.2)*.02;

    camera.position.x = lerp(camera.position.x, gMouseX*5, .015);
    camera.position.y = lerp(camera.position.y, -gMouseY*3, .015);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 5 ─ PUBLICATIONS: DNA Helix with Energy Pulses
// ══════════════════════════════════════════════════════════════
(function pubScene() {
  const s = buildScene('pub-canvas', 60, 55);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Background dust — purple tint
  const DUST = 600;
  const dp = new Float32Array(DUST*3);
  for (let i=0;i<DUST;i++) { dp[i*3]=(Math.random()-.5)*110; dp[i*3+1]=(Math.random()-.5)*80; dp[i*3+2]=(Math.random()-.5)*30; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp,3));
  scene.add(new THREE.Points(dg, new THREE.PointsMaterial({ color:0x1a0033, size:.13, transparent:true, opacity:.3, blending:THREE.AdditiveBlending, depthWrite:false })));

  // DNA helix
  const helixGroup = new THREE.Group();
  helixGroup.position.set(28, 0, -8);
  scene.add(helixGroup);

  const STEPS = 60, H = 38, R = 5.5;
  const s1 = [], s2 = [];
  const sGeo = new THREE.SphereGeometry(.24, 8, 8);

  const helixNodes = [];
  for (let i = 0; i < STEPS; i++) {
    const t  = i/STEPS;
    const ang = t*Math.PI*4;
    const y   = (t-.5)*H;

    const p1 = new THREE.Vector3(Math.cos(ang)*R,   y, Math.sin(ang)*R);
    const p2 = new THREE.Vector3(Math.cos(ang+Math.PI)*R, y, Math.sin(ang+Math.PI)*R);
    s1.push(p1); s2.push(p2);

    [p1,p2].forEach((p,si) => {
      const m = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(.66+si*.07+t*.1,1,.65),
        transparent:true, opacity:.75, blending:THREE.AdditiveBlending, depthWrite:false
      }));
      m.position.copy(p); m.userData = { t, si };
      helixNodes.push(m); helixGroup.add(m);
    });

    if (i % 3 === 0) {
      helixGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([p1.clone(), p2.clone()]),
        new THREE.LineBasicMaterial({ color:0x7700dd, transparent:true, opacity:.25, blending:THREE.AdditiveBlending, depthWrite:false })
      ));
    }
  }

  // Strand curves with richer colors
  [s1,s2].forEach((arr,ci) => {
    const curve = new THREE.CatmullRomCurve3(arr);
    helixGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(200)),
      new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.65+ci*.08,1,.55), transparent:true, opacity:.4, blending:THREE.AdditiveBlending, depthWrite:false })
    ));
  });

  // Orbiting electrons with trail effect
  const orbN = 30, orbGeo = new THREE.SphereGeometry(.16, 6, 6);
  const orbs = [];
  for (let i=0;i<orbN;i++) {
    const m = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(.68+Math.random()*.15,1,.78), transparent:true, opacity:.65, blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.userData = { t:Math.random(), spd:.0015+Math.random()*.002, ro:R+2.5+Math.random()*3, ao:Math.random()*Math.PI*2 };
    orbs.push(m); helixGroup.add(m);
  }

  // Energy pulse traveling along helix
  const pulseGeo = new THREE.SphereGeometry(.45, 8, 8);
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false });
  const pulse = new THREE.Mesh(pulseGeo, pulseMat);
  pulse.userData = { t: 0, spd: .003 };
  helixGroup.add(pulse);

  let t = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['publications']) return;
    t += .008;
    helixGroup.rotation.y = t*.1;
    helixGroup.position.y = Math.sin(t*.25)*2;

    // Energy pulse
    pulse.userData.t = (pulse.userData.t + pulse.userData.spd) % 1;
    const pt = pulse.userData.t;
    const pAng = pt * Math.PI * 4;
    const pY = (pt - .5) * H;
    pulse.position.set(Math.cos(pAng) * R, pY, Math.sin(pAng) * R);
    pulse.material.opacity = .35 + .2*Math.sin(t*5);
    pulse.scale.setScalar(.8 + .3*Math.sin(t*4));

    // Make nearby helix nodes glow brighter when pulse passes
    helixNodes.forEach(hn => {
      const dist = hn.position.distanceTo(pulse.position);
      const glow = Math.max(0, 1 - dist / 4);
      hn.material.opacity = .65 + glow * .35;
      hn.scale.setScalar(1 + glow * .4);
    });

    orbs.forEach(o => {
      o.userData.t = (o.userData.t + o.userData.spd) % 1;
      const ang = o.userData.t*Math.PI*4 + o.userData.ao;
      const y   = (o.userData.t-.5)*H;
      o.position.set(Math.cos(ang)*o.userData.ro, y, Math.sin(ang)*o.userData.ro);
      o.material.opacity = .35 + .3*Math.sin(t*3 + o.userData.t*10);
    });
    camera.position.x = lerp(camera.position.x, gMouseX*3.5, .018);
    camera.position.y = lerp(camera.position.y, -gMouseY*2.5, .018);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 6 ─ CERTIFICATIONS: Circuit Board with Signal Trails
// ══════════════════════════════════════════════════════════════
(function certScene() {
  const s = buildScene('certifications-canvas', 60, 55);
  if (!s) return;
  const { renderer, scene, camera } = s;
  camera.position.set(0, 18, 55); camera.lookAt(0,0,0);

  const COL = 0x004422;
  const traceGroup = new THREE.Group();
  scene.add(traceGroup);

  const W = 95, H_T = 58;

  function traceMat(op = .1) {
    return new THREE.LineBasicMaterial({ color:COL, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false });
  }

  // Horizontal traces
  for (let r = 0; r < 14; r++) {
    if (Math.random() < .55) {
      const y  = (r/13-.5)*H_T;
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
      const y1 = (Math.random()-.5)*H_T, y2 = (Math.random()-.5)*H_T;
      traceGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,Math.min(y1,y2),0), new THREE.Vector3(x,Math.max(y1,y2),0)]),
        traceMat()
      ));
    }
  }
  // L-bends
  for (let k = 0; k < 20; k++) {
    const x1=(Math.random()-.5)*W, y1=(Math.random()-.5)*H_T;
    const x2=x1+(Math.random()-.5)*24, y2=y1+(Math.random()-.5)*18;
    traceGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1,y1,0), new THREE.Vector3(x2,y1,0), new THREE.Vector3(x2,y2,0)]),
      traceMat(.07 + Math.random()*.07)
    ));
  }

  // Pads with glow
  const padGeo = new THREE.CircleGeometry(.45, 10);
  const pulsingPads = [];
  for (let i = 0; i < 40; i++) {
    const px = (Math.random()-.5)*W, py = (Math.random()-.5)*H_T;
    const padMat = new THREE.MeshBasicMaterial({ color:0x22d3a8, transparent:true, opacity:.3, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(px,py,0);
    pad.userData = { phase: Math.random()*Math.PI*2 };
    pulsingPads.push(pad); traceGroup.add(pad);

    const rMat = new THREE.MeshBasicMaterial({ color:0x00cc66, transparent:true, opacity:.1, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(.55,.7,14), rMat);
    ring.position.set(px,py,0); traceGroup.add(ring);
  }

  // Signal dots with trail effect
  const sigDots = [];
  for (let k = 0; k < 8; k++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(.3,6,6),
      new THREE.MeshBasicMaterial({ color:0x22d3a8, transparent:true, opacity:.75, blending:THREE.AdditiveBlending, depthWrite:false })
    );
    m.userData = { x:(Math.random()-.5)*W, y:(Math.random()-.5)*H_T, tx:(Math.random()-.5)*W, t:Math.random(), spd:.12+Math.random()*.2 };
    sigDots.push(m); traceGroup.add(m);
  }

  let certT = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['certifications']) return;
    certT += .009;
    traceGroup.rotation.x = -.22 + Math.sin(certT*.1)*.04;
    traceGroup.rotation.y = Math.sin(certT*.07)*.05;
    pulsingPads.forEach(p => {
      const s = .7 + .35*Math.sin(certT*1.5 + p.userData.phase);
      p.scale.setScalar(s);
      p.material.opacity = .18 + .2*Math.sin(certT*1.5 + p.userData.phase);
    });
    sigDots.forEach(d => {
      d.userData.t += d.userData.spd*.012;
      if (d.userData.t > 1) { d.userData.t=0; d.userData.x=d.userData.tx; d.userData.tx=(Math.random()-.5)*W; }
      d.position.x = d.userData.x + (d.userData.tx - d.userData.x)*d.userData.t;
      d.position.y = d.userData.y;
      d.material.opacity = .5 + .3*Math.sin(certT*3 + d.userData.t*10);
    });
    camera.position.x = lerp(camera.position.x, gMouseX*3.5, .015);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ══════════════════════════════════════════════════════════════
// SCENE 7 ─ CONTACT: Globe with Satellites + Atmospheric Halo
// ══════════════════════════════════════════════════════════════
(function contactScene() {
  const s = buildScene('contact-canvas', 55, 52);
  if (!s) return;
  const { renderer, scene, camera } = s;

  // Stars
  const STAR_N = 1500;
  const sPa = new Float32Array(STAR_N*3), sCa = new Float32Array(STAR_N*3);
  for (let i=0;i<STAR_N;i++) {
    sPa[i*3]=(Math.random()-.5)*300; sPa[i*3+1]=(Math.random()-.5)*220; sPa[i*3+2]=-60-Math.random()*100;
    const c=new THREE.Color().setHSL(.56+Math.random()*.12,.5,.6+Math.random()*.3);
    sCa[i*3]=c.r; sCa[i*3+1]=c.g; sCa[i*3+2]=c.b;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPa,3));
  sGeo.setAttribute('color', new THREE.BufferAttribute(sCa,3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ size:.22, vertexColors:true, transparent:true, opacity:.5, blending:THREE.AdditiveBlending, depthWrite:false })));

  const GLOBE_R = 17;
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Lat/lon grid
  const gridMat = new THREE.LineBasicMaterial({ color:0x003366, transparent:true, opacity:.08, blending:THREE.AdditiveBlending, depthWrite:false });

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
  const dotG = new THREE.SphereGeometry(.14,6,6);
  for (let i=0;i<300;i++) {
    const phi=Math.acos(-1+2*i/300), th=Math.sqrt(300*Math.PI)*phi;
    const m = new THREE.Mesh(dotG, new THREE.MeshBasicMaterial({
      color:new THREE.Color().setHSL(.56+i/300*.12,1,.65), transparent:true, opacity:.5, blending:THREE.AdditiveBlending, depthWrite:false
    }));
    m.position.setFromSphericalCoords(GLOBE_R, phi, th);
    globeGroup.add(m);
  }

  // Multi-layered atmosphere
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_R*1.08,32,32),
    new THREE.MeshBasicMaterial({ color:0x0044aa, transparent:true, opacity:.04, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.BackSide })
  ));
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_R*1.15,32,32),
    new THREE.MeshBasicMaterial({ color:0x8b5cf6, transparent:true, opacity:.02, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.BackSide })
  ));

  // Atmospheric halo ring
  const haloGeo = new THREE.TorusGeometry(GLOBE_R*1.25, .15, 6, 80);
  const haloMat = new THREE.MeshBasicMaterial({ color:0x06d6f2, transparent:true, opacity:.08, blending:THREE.AdditiveBlending, depthWrite:false });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI * .4;
  globeGroup.add(halo);

  // Satellite dots orbiting
  const SAT_N = 5;
  const satGeo = new THREE.SphereGeometry(.2, 6, 6);
  const sats = [];
  for (let i = 0; i < SAT_N; i++) {
    const m = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(.55+Math.random()*.15, 1, .75),
      transparent: true, opacity: .7,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    m.userData = { r: GLOBE_R*1.3 + Math.random()*4, spd: .005+Math.random()*.01, phase: Math.random()*Math.PI*2, tilt: Math.random()*Math.PI*.6 };
    sats.push(m); globeGroup.add(m);
  }

  // Animated arc connections
  const arcGroup = new THREE.Group(); globeGroup.add(arcGroup);
  let arcTimer = 0;
  function spawnArc() {
    const rPt = () => { const ph=Math.acos(-1+Math.random()*2), th=Math.random()*Math.PI*2; return new THREE.Vector3().setFromSphericalCoords(GLOBE_R, ph, th); };
    const a = rPt(), b = rPt();
    const mid = new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);
    mid.normalize().multiplyScalar(GLOBE_R*(1.3+Math.random()*.3));
    const pts = new THREE.QuadraticBezierCurve3(a,mid,b).getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color:new THREE.Color().setHSL(.55+Math.random()*.12,1,.72), transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
    const line = new THREE.Line(geo, mat);
    arcGroup.add(line);
    let life=0; const maxL=3+Math.random()*2;
    const tick = () => {
      life += .016;
      const p = life/maxL;
      mat.opacity = p<.2 ? (p/.2)*.45 : p>.8 ? ((1-p)/.2)*.45 : .45;
      if (life < maxL) requestAnimationFrame(tick);
      else { arcGroup.remove(line); geo.dispose(); mat.dispose(); }
    };
    tick();
  }

  let contT = 0;
  (function render() {
    requestAnimationFrame(render);
    if (!sectionVisible['contact']) return;
    contT += .01; arcTimer += .016;
    if (arcTimer > 1.8) { arcTimer = 0; spawnArc(); }
    globeGroup.rotation.y += .0025;
    globeGroup.rotation.x = Math.sin(contT*.15)*.06;

    // Halo pulse
    haloMat.opacity = .05 + .04*Math.sin(contT*1.5);
    halo.rotation.z += .001;

    // Satellites
    sats.forEach(sat => {
      const u = sat.userData;
      u.phase += u.spd;
      sat.position.set(
        Math.cos(u.phase) * u.r,
        Math.sin(u.phase) * Math.sin(u.tilt) * u.r * .5,
        Math.sin(u.phase) * u.r
      );
    });

    camera.position.x = lerp(camera.position.x, gMouseX*5, .018);
    camera.position.y = lerp(camera.position.y, -gMouseY*3, .018);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  })();
})();

// ════ AMBIENT PARTICLES ══════════════════════════════════════
(function initAmbientParticles() {
  const container = document.querySelector('.ambient-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 12 + 's';
    p.style.animationDuration = (10 + Math.random() * 8) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    if (Math.random() > .7) p.style.background = '#8b5cf6';
    else if (Math.random() > .5) p.style.background = '#3b82f6';
    container.appendChild(p);
  }
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

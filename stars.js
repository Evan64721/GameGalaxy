function initStars() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const stars = Array.from({length: 220}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*1.5+0.3,
    a: Math.random(), da: (Math.random()-0.5)*0.006
  }));
  function draw() {
    ctx.clearRect(0,0,W,H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a < 0.1 || s.a > 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(180,210,255,${s.a.toFixed(2)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
window.addEventListener('load', initStars);

const BASE = 'https://evan64721.github.io/GameGalaxy/';

function navigate(url) {
  document.body.classList.add('fade-out');
  setTimeout(() => window.location.href = url, 300);
}

function saveScore(game, data) {
  const all = JSON.parse(localStorage.getItem('gg-scores') || '{}');
  all[game] = { ...all[game], ...data, updated: Date.now() };
  const stats = JSON.parse(localStorage.getItem('gg-stats') || '{"stars":0,"played":0}');
  if (data.stars) stats.stars += data.stars;
  stats.played += 1;
  localStorage.setItem('gg-stats', JSON.stringify(stats));
  localStorage.setItem('gg-scores', JSON.stringify(all));
}

function loadScore(game) {
  const all = JSON.parse(localStorage.getItem('gg-scores') || '{}');
  return all[game] || {};
}

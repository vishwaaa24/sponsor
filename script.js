document.getElementById('yr').textContent = new Date().getFullYear();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const orbs = [
  { x: 0.2, y: 0.3, r: 280, vx: 0.00015, vy: 0.0001,  color: 'rgba(124,58,237,' },
  { x: 0.8, y: 0.7, r: 200, vx: -0.0001, vy: -0.00015, color: 'rgba(167,139,250,' },
  { x: 0.5, y: 0.1, r: 160, vx: 0.0002,  vy: 0.0001,   color: 'rgba(109,40,217,' },
];

let t = 0;
function draw() {
  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(124,58,237,0.04)';
  ctx.lineWidth = 1;
  const gs = 60;
  for (let x = 0; x < W; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  orbs.forEach(o => {
    o.x += o.vx; o.y += o.vy;
    if (o.x < 0 || o.x > 1) o.vx *= -1;
    if (o.y < 0 || o.y > 1) o.vy *= -1;
    const grd = ctx.createRadialGradient(o.x*W, o.y*H, 0, o.x*W, o.y*H, o.r);
    grd.addColorStop(0, o.color + '0.18)');
    grd.addColorStop(1, o.color + '0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(o.x*W, o.y*H, o.r, 0, Math.PI*2);
    ctx.fill();
  });

  t += 0.008;
  for (let i = 0; i < 30; i++) {
    const px = (Math.sin(t * 0.3 + i * 2.1) * 0.5 + 0.5) * W;
    const py = ((t * 0.04 + i * 0.033) % 1) * H;
    const alpha = Math.sin(t + i) * 0.5 + 0.5;
    ctx.globalAlpha = alpha * 0.18;
    ctx.fillStyle = i % 3 === 0 ? '#7c3aed' : '#a78bfa';
    ctx.beginPath();
    ctx.arc(px, py, 1.2, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(draw);
}
draw();
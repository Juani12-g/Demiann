const btn = document.getElementById("activateBtn");
const music = document.getElementById("music");
const area = document.getElementById("animationArea");
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ⭐ ESTRELLAS FIJAS */
const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5
}));

/* ☄️ ESTRELLAS FUGACES */
let meteors = [];

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  meteors.forEach((m, i) => {
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
    ctx.stroke();

    m.x += m.vx;
    m.y += m.vy;

    if (m.x < 0 || m.y > canvas.height) {
      meteors.splice(i, 1);
    }
  });

  requestAnimationFrame(drawStars);
}

function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: 0,
    vx: Math.random() * 6 + 4,
    vy: Math.random() * 6 + 4
  });
}

setInterval(spawnMeteor, 1400);
drawStars();

/* 🖼️ IMÁGENES */
const images = [
  "assets/cafe.png",
  "assets/cancha.png",
  "assets/oveja.png",
  "assets/perrita.png",
  "assets/renault.png",
  "assets/vaca.png",
  "assets/vino.png",
  "assets/tractor.png",
  "assets/campo.png",
  "assets/caballo.png",
  "assets/escudo.png",
  "assets/mate.png",
  "assets/fernet.png",
  "assets/gym.png",
  "assets/alfajor.png",
  "assets/hamster2.png",
  "assets/shakker.png",
  "assets/cafecito.png",
  "assets/frutillas.png",
  "assets/monster.png",
  "assets/nota.png",
  "assets/bal.png",
  "assets/bnn.png",

];

let particles = [];
let index = 0;

btn.addEventListener("click", () => {
  btn.style.display = "none";
  music.play();
setInterval(createHeart, 900);
  spawnNextImage();
});

/* aparece de a una */
function spawnNextImage() {
  if (index >= images.length) return;

  createParticle(images[index]);
  index++;

  setTimeout(spawnNextImage, 1200); // ⏱️ delay entre imágenes
}

/* crear imagen */
function createParticle(src) {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.backgroundImage = `url(${src})`;

  el.x = window.innerWidth / 2;
  el.y = window.innerHeight / 2;

  el.vx = Math.random() * 1.8 - 0.4;
  el.vy = Math.random() * 1.8 - 0.4;

  area.appendChild(el);
  particles.push(el);
}

/* flotan siempre */
function animateParticles() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > window.innerWidth - 120) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight - 120) p.vy *= -1;

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

/* resize */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  heart.style.transform = `scale(${0.6 + Math.random()}) rotate(45deg)`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}
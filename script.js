document.addEventListener("DOMContentLoaded", (event) => {
  // Audio
  setTimeout(() => {
    const audio = document.getElementById("music");
    audio.play();
  }, 1000);

  // Gaben rises
  setTimeout(() => {
    document.getElementById("gaben-img").classList.add("show");
  }, 5000);
});

// Sun animation
const canvas = document.getElementById("wedgeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angleOffset = 0;

function drawWedge(angle, color) {
  const radius = Math.sqrt(
    Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2),
  );
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    angle,
    angle + (Math.PI * 2) / 50,
  );
  ctx.closePath();
  ctx.fill();
}

function createWedges() {
  const totalWedges = 50;
  const colors = ["#cbb618", "#e5dfc4"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalWedges; i++) {
    const angle = angleOffset + (i * 2 * Math.PI) / totalWedges;
    const color = colors[i % 2];
    drawWedge(angle, color);
  }
}

function animate() {
  angleOffset += 0.01;
  createWedges();
  requestAnimationFrame(animate);
}

animate();

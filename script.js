// DOM elements
const gabenImg = document.getElementById("gaben");
const startButton = document.getElementById("start-button")
const buttonGroup = document.getElementById("button-group")
const stopButton = document.getElementById("stop-button")
const muteButtonContainer = document.getElementById("mute-button-container")
const audio = document.getElementById("music");

const unmutedSvg = `
                <svg id="mute-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
            `;

const mutedSvg = `
                <svg id="mute-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
            `;

let isPlaying = false;
let isMuted = false;

// Sunburst background animation variables
const canvas = document.getElementById("sunburstCanvas");
const ctx = canvas.getContext("2d");
const totalWedges = 50;
const colors = ["#cbb618", "#e5dfc4"];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let angleOffset = 0;
let animationId;
let timer = 0;
let seconds = 0;


function drawWedge(angle, color) {
  const radius = Math.sqrt(
    Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2),
  );
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalWedges; i++) {
    const angle = angleOffset + (i * 2 * Math.PI) / totalWedges + Math.PI / 2;
    const color = colors[i % 2];
    drawWedge(angle, color);
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (isPlaying) {
    createWedges();
  }
}

function animate() {
  angleOffset += 0.01;
  createWedges();
  animationId = requestAnimationFrame(animate);
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
}

function resetState() {
  cancelAnimationFrame(animationId);
  resetTimer();

  isPlaying = false;

  document.body.style.backgroundColor = "black";

  // Set display
  canvas.style.display = "none";
  startButton.style.display = "block";
  buttonGroup.style.display = "none";

  gabenImg.style.transition = "";
  gabenImg.classList.remove("show");
  gabenImg.classList.add("hidden");
}

startButton.addEventListener("click", () => {
  isPlaying = true;

  // Set display states
  startButton.style.display = "none";
  buttonGroup.style.display = "flex";
  canvas.style.display = "block";

  // Set background color;
  document.body.style.backgroundColor = "#e5dfc4";

  // Audio
  audio.play();

  // Gaben rises
  setTimeout(() => {
    gabenImg.classList.remove("hidden");
    gabenImg.classList.add("show");
    startTimer()
  }, 2000);

  animate();
});

stopButton.addEventListener("click", () => {
  const currentBottom = window.getComputedStyle(gabenImg).bottom;

  if (isPlaying) {
    clearInterval(timer);
    if (currentBottom !== "0px") {
      gabenImg.classList.remove("show");
      gabenImg.style.bottom = currentBottom;
    }
    isPlaying = false;
    audio.pause();
    cancelAnimationFrame(animationId);
  } else {
    if (currentBottom !== "0px") {
      if (seconds > 0 && seconds < 15) {
        gabenImg.style.transition = `bottom ${15 - seconds}s linear`
      }
      gabenImg.style.bottom = "0px"
    }
    isPlaying = true;
    audio.play();
    startTimer()
    animationId = requestAnimationFrame(animate);
  }
})

muteButtonContainer.addEventListener("click", () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  muteButtonContainer.innerHTML = isMuted ? mutedSvg : unmutedSvg;
});

window.addEventListener('resize', resizeCanvas);

audio.addEventListener("ended", () => {
  resetState();
})
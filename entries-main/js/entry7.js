const audio = document.getElementById("StayAudio");
const playButton = document.getElementById("playButton");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("currentTime");
const durationTimeElement = document.getElementById("durationTime");

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.classList.add("playing");
  } else {
    audio.pause();
    playButton.classList.remove("playing");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") { 
    event.preventDefault();
    if (audio.paused) {
      audio.play();
      playButton.classList.add("playing");
    } else {
      audio.pause();
      playButton.classList.remove("playing");
    }
  }
});

progressBar.addEventListener("click", (event) => {
  const clickPosition = event.offsetX;
  const progressBarWidth = progressBar.offsetWidth;
  const newTime = (clickPosition / progressBarWidth) * audio.duration;

  audio.currentTime = newTime;
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeElement.textContent = formatTime(currentTime);

  const remainingTime = duration - currentTime;
  durationTimeElement.textContent = formatTime(remainingTime);
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audio.addEventListener("loadedmetadata", () => {
  const duration = audio.duration;
  durationTimeElement.textContent = formatTime(duration);
});

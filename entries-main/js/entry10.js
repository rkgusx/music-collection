document.addEventListener("DOMContentLoaded", () => {
  const gif = document.getElementById("background-gif");
  const pausedImage = document.getElementById("paused-image");
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("playButton");
  const progressBar = document.getElementById("progressBar");
  const progress = document.getElementById("progress");
  const currentTimeSpan = document.getElementById("currentTime");
  const durationTimeSpan = document.getElementById("durationTime");

  let isPlaying = false;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateRemainingTime = () => {
    if (!isNaN(audio.duration)) {
      const remainingTime = audio.duration - audio.currentTime;
      durationTimeSpan.textContent = formatTime(remainingTime);
    } else {
      durationTimeSpan.textContent = "0:00";
    }
  };

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();
      playButton.classList.add("playing");
      gif.style.display = "block";
      pausedImage.style.display = "none";
    } else {
      audio.pause();
      playButton.classList.remove("playing");
      gif.style.display = "none";
      pausedImage.style.display = "block";
    }
    isPlaying = !isPlaying;
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      togglePlayPause();
      event.preventDefault();
    }
  });

  playButton.addEventListener("click", () => {
    togglePlayPause();
  });

  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    updateRemainingTime();
  });

  progressBar.addEventListener("click", (e) => {
    const barWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / barWidth) * audio.duration;
  });

  audio.addEventListener("loadedmetadata", () => {
    updateRemainingTime();
  });

  const createStars = () => {
    const starContainer = document.querySelector(".stars");
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;

      const size = Math.random() * 3 + 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      starContainer.appendChild(star);
    }
  };

  createStars();
});

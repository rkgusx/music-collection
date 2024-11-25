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

    let storedStars = localStorage.getItem('starPositions');
    if (!storedStars) {
      storedStars = [];
      for (let i = 0; i < starCount; i++) {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        storedStars.push({ top, left });
      }
      localStorage.setItem('starPositions', JSON.stringify(storedStars));
    } else {
      storedStars = JSON.parse(storedStars);
    }

    storedStars.forEach(star => {
      const starElement = document.createElement("div");
      starElement.classList.add("star");
      starElement.style.top = `${star.top}%`;
      starElement.style.left = `${star.left}%`;

      const size = Math.random() * 3 + 2;
      starElement.style.width = `${size}px`;
      starElement.style.height = `${size}px`;

      starContainer.appendChild(starElement);
    });
  };

  createStars();
});

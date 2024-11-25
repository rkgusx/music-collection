document.addEventListener("DOMContentLoaded", () => {
    const bellImg = document.querySelector(".bell-img");
    const pizzaClosedImg = document.querySelector(".pizza-closed-img");
    const bellSound = document.getElementById("bell-sound");
    const rideSong = document.getElementById("ride-song");
    const progress = document.getElementById("progress");
    const currentTime = document.getElementById("currentTime");
    const durationTime = document.getElementById("durationTime");
    const progressBar = document.getElementById("progressBar");
    const musicNoteContainer = document.querySelector(".music-note-container");
    const arrow = document.querySelector(".arrow");
    const h2 = document.querySelector("h2");
    let isPlayingBell = false;
    let isPizzaOpen = false;
    let isSongPlaying = false;

    bellImg.addEventListener("click", () => {
        if (!isPlayingBell) {
            bellSound.play();
            isPlayingBell = true;
    
            setTimeout(() => {

                if (!isPizzaOpen) {
                    pizzaClosedImg.src = "../images/pizza-open.png";
                    isPizzaOpen = true;
    
                    if (!isSongPlaying) {
                        rideSong.play();
                        isSongPlaying = true;
                    }
    
                    musicNoteContainer.style.display = "flex"; 
                    h2.style.display = "none";
                    arrow.style.display = "none";
                } else {
                    pizzaClosedImg.src = "../images/pizza-closed.png";
                    isPizzaOpen = false;
    
                    rideSong.pause();
                    isSongPlaying = false;
    
                    musicNoteContainer.style.display = "none"; 
                    h2.style.display = "block";
                    arrow.style.display = "block";
                }
            }, 0);
        }
    });
    
    bellSound.addEventListener("ended", () => {
        isPlayingBell = false;
    });
    
    rideSong.addEventListener("timeupdate", () => {
        const current = rideSong.currentTime;
        const duration = rideSong.duration;
        const remaining = duration - current;

        progress.style.width = (current / duration) * 100 + '%';
        currentTime.textContent = formatTime(current);
        durationTime.textContent = formatTime(remaining);
    });
    
    progressBar.addEventListener("click", (event) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percent = clickX / rect.width;
        rideSong.currentTime = percent * rideSong.duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
});

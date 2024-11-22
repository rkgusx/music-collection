document.addEventListener("DOMContentLoaded", () => {
    const bellImg = document.querySelector(".bell-img");
    const pizzaClosedImg = document.querySelector(".pizza-closed-img");
    const bellSound = document.getElementById("bell-sound");
    const rideSoleSound = document.getElementById("ride-sole-sound");
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
            // 종 클릭 시 sound effect
            bellSound.play();
            isPlayingBell = true;
    
            // 효과음 재생 후 나머지
            setTimeout(() => {

                if (!isPizzaOpen) {
                    pizzaClosedImg.src = "../images/pizza-open.png";
                    isPizzaOpen = true;
    
                    if (!isSongPlaying) {
                        rideSoleSound.play(); // 피자 열 때 노래 실행
                        isSongPlaying = true;
                    }
    
                    // 피자 열리고 종 클릭되면 뮤직 노트 표시
                    musicNoteContainer.style.display = "flex"; 
                    h2.style.display = "none"; // h2 숨기기
                    arrow.style.display = "none"; // arrow 숨기기
                } else {
                    pizzaClosedImg.src = "../images/pizza-closed.png";
                    isPizzaOpen = false;
    
                    rideSoleSound.pause(); // 피자 닫을 때 노래 일시 정지
                    isSongPlaying = false;
    
                    // 피자 닫히면 뮤직 노트 숨기기
                    musicNoteContainer.style.display = "none"; 
                    h2.style.display = "block"; // h2 다시 보이기
                    arrow.style.display = "block"; // 화살표 다시 보이기
                }
            }, 0);
        }
    });
    
    bellSound.addEventListener("ended", () => {
        isPlayingBell = false;
    });
    
    rideSoleSound.addEventListener("timeupdate", () => {
        const current = rideSoleSound.currentTime;
        const duration = rideSoleSound.duration;
        const remaining = duration - current;

        progress.style.width = (current / duration) * 100 + '%';
        currentTime.textContent = formatTime(current);
        durationTime.textContent = formatTime(remaining);
    });
    
    progressBar.addEventListener("click", (event) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percent = clickX / rect.width;
        rideSoleSound.currentTime = percent * rideSoleSound.duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
});

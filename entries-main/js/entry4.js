document.addEventListener("DOMContentLoaded", () => {
    const bellImg = document.querySelector(".bell-img");
    const pizzaClosedImg = document.querySelector(".pizza-closed-img");
    const bellSound = document.getElementById("bell-sound"); // BellSoundEffect.mp3
    const rideSoleSound = document.getElementById("ride-sole-sound"); // Ride-Sole.mp3
    const progress = document.getElementById("progress");
    const currentTime = document.getElementById("currentTime");
    const durationTime = document.getElementById("durationTime");
    const progressBar = document.getElementById("progressBar");
    const musicNoteContainer = document.querySelector(".music-note-container");
    let isPlayingBell = false;
    let isPizzaOpen = false;
    let isSongPlaying = false;

    bellImg.addEventListener("click", () => {
        if (!isPlayingBell) {
            bellSound.play();
            isPlayingBell = true;

            // 피자 열기 및 닫기
            if (!isPizzaOpen) {
                pizzaClosedImg.src = "../images/pizza-open.png";
                isPizzaOpen = true;
                if (!isSongPlaying) {
                    rideSoleSound.play(); // 피자 열 때 Ride-Sole.mp3 실행
                    isSongPlaying = true;
                }
                // 피자 열리고 종 클릭되면 뮤직 노트 표시
                musicNoteContainer.style.display = "flex"; 
            } else {
                pizzaClosedImg.src = "../images/pizza-closed.png";
                isPizzaOpen = false;
                rideSoleSound.pause(); // 피자 닫을 때 Ride-Sole.mp3 일시 정지
                isSongPlaying = false;
                // 피자 닫히면 뮤직 노트 숨기기
                musicNoteContainer.style.display = "none"; 
            }
        }
    });

    bellSound.addEventListener("ended", () => {
        isPlayingBell = false;
    });

    // Ride-Sole.mp3의 시간
    rideSoleSound.addEventListener("timeupdate", () => {
        const current = rideSoleSound.currentTime;
        const remaining = rideSoleSound.duration - current;

        // Progress bar
        progress.style.width = (current / rideSoleSound.duration) * 100 + '%';
        currentTime.textContent = formatTime(current);
        durationTime.textContent = formatTime(remaining);
    });

    // Progress bar 클릭 시 노래 시간 조정
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

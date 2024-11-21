document.addEventListener("DOMContentLoaded", () => {
    const cameraImg = document.querySelector(".DigitalCamera img");
    const clickLeft = document.querySelector(".click-left");
    const clickRight = document.querySelector(".click-right");
    const photos = document.querySelectorAll(".DigitalCamera .photo");
    const photoContainer = document.querySelector(".photo-container");
    const darkOverlay = document.querySelector(".dark-overlay");
    
    let currentImageIndex = 0;
    let isAtCenter = false;

    const updateImage = () => {
        photos.forEach((photo, index) => {
            photo.classList.toggle("active", index === currentImageIndex);
        });
    };

    cameraImg.style.transition = "none";
    cameraImg.style.bottom = "-400px"; 
    photoContainer.style.transition = "none"; 
    photoContainer.style.transform = "translateY(100%)"; 

    const hideButtons = () => {
        clickLeft.classList.remove("show");
        clickRight.classList.remove("show");
    };

    const showButtons = () => {
        clickLeft.classList.add("show");
        clickRight.classList.add("show");
    };

    // 카메라와 배경 전환
    cameraImg.addEventListener("click", () => {
        if (!isAtCenter) {
            cameraImg.style.transition = "bottom 0.5s ease";
            cameraImg.style.bottom = "0px"; 

            photoContainer.style.transition = "transform 1s ease";
            photoContainer.style.transform = "translateY(-10%)"; 

            showButtons();

            // 배경을 어두운 색으로 변화
            darkOverlay.style.transition = "background 0.7s ease";
            darkOverlay.style.background = "radial-gradient(circle at 50% 50%, #f0f0f0, #b6b6b6 70%, #717171)"; 

            isAtCenter = true;
        } else {
            cameraImg.style.transition = "bottom 0.5s ease"; 
            cameraImg.style.bottom = "-400px"; 

            photoContainer.style.transition = "transform 3s ease"; 
            photoContainer.style.transform = "translateY(100%)"; 

            hideButtons();

            // 배경을 원래 색으로 돌아가게 설정
            darkOverlay.style.transition = "background 0.7s ease";  
            darkOverlay.style.background = "rgba(0, 0, 0, 0)"; 

            isAtCenter = false;
        }
    });

    clickLeft.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
        updateImage();
    });

    clickRight.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % photos.length;
        updateImage();
    });

    // 방향키 이벤트
    document.addEventListener("keydown", (e) => {
        if (isAtCenter) { 
            if (e.key === "ArrowLeft") {
                clickLeft.click();  // 방향키 왼쪽 눌렀을 때 click-left 클릭
            } else if (e.key === "ArrowRight") {
                clickRight.click();  // 방향키 오른쪽 눌렀을 때 click-right 클릭
            }
        }
    });

    // 스페이스바 이벤트 (노래 재생/멈춤 + 카메라/배경 전환)
    document.addEventListener("keydown", (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // 기본 동작 방지

            // 노래 재생/멈춤
            togglePlay();

            // 카메라와 배경 전환
            if (!isAtCenter) {
                cameraImg.style.transition = "bottom 0.5s ease";
                cameraImg.style.bottom = "0px"; 

                photoContainer.style.transition = "transform 0.4s ease";
                photoContainer.style.transform = "translateY(-10%)"; 

                showButtons();

                // 배경을 어두운 색으로 변화
                darkOverlay.style.transition = "background 3s ease";
                darkOverlay.style.background = "radial-gradient(circle at 50% 50%, #f0f0f0, #b6b6b6 70%, #717171)"; 

                isAtCenter = true;
            } else {
                cameraImg.style.transition = "bottom 0.5s ease"; 
                cameraImg.style.bottom = "-400px"; 

                photoContainer.style.transition = "transform 0.4s ease"; 
                photoContainer.style.transform = "translateY(100%)"; 

                hideButtons();

                // 배경을 원래 색으로 돌아가게 설정
                darkOverlay.style.transition = "background 3s ease";  
                darkOverlay.style.background = "rgba(0, 0, 0, 0)"; 

                isAtCenter = false;
            }
        }
    });

    updateImage();

    // 오디오 플레이어 관련 코드
    const audio = document.getElementById('PhotographEdsheeran');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    const durationTime = document.getElementById('durationTime');
    let playing = false;

    audio.addEventListener('loadedmetadata', () => {
        durationTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const current = audio.currentTime;
        const remaining = audio.duration - current;

        progress.style.width = (current / audio.duration) * 100 + '%';
        currentTime.textContent = formatTime(current);
        durationTime.textContent = formatTime(remaining);
    });

    playButton.addEventListener('click', togglePlay);

    progressBar.addEventListener('click', (event) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percent = clickX / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    function togglePlay() {
        playing ? pauseAudio() : playAudio();
    }

    function playAudio() {
        audio.play();
        playing = true;
        playButton.classList.add('playing');
    }

    function pauseAudio() {
        audio.pause();
        playing = false;
        playButton.classList.remove('playing');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
});

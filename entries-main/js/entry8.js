document.addEventListener("DOMContentLoaded", () => {
    const cameraImg = document.querySelector(".DigitalCamera img");
    const clickLeft = document.querySelector(".click-left");
    const clickRight = document.querySelector(".click-right");
    const photos = document.querySelectorAll(".DigitalCamera .photo");
    const photoContainer = document.querySelector(".photo-container");
    const darkOverlay = document.querySelector(".dark-overlay");
    
    let currentImageIndex = 0;
    let isAtCenter = false;

    // 초기 상태 설정
    cameraImg.style.transition = "none";
    cameraImg.style.bottom = "-400px"; 
    photoContainer.style.transition = "none"; 
    photoContainer.style.transform = "translateY(100%)"; 
    darkOverlay.style.transition = "none";
    darkOverlay.style.background = "rgba(0, 0, 0, 0)";
    darkOverlay.style.opacity = "0";

    setTimeout(() => {
        cameraImg.style.transition = "bottom 0.45s ease";
        photoContainer.style.transition = "transform 0.45s ease";
        darkOverlay.style.transition = "background 1s ease, opacity 1.5s ease";
    }, 50);

    const updateImage = () => {
        photos.forEach((photo, index) => {
            photo.classList.toggle("active", index === currentImageIndex);
        });
    };

    const toggleCameraPosition = () => {
        if (!isAtCenter) {
            cameraImg.style.bottom = "0px"; 
            photoContainer.style.transform = "translateY(-10%)"; 
            showButtons();
    
            // 배경 어두운 색으로
            darkOverlay.style.background = "radial-gradient(circle at 50% 50%, #c8c8c8, #8a8a8a 70%, #404040)";
            darkOverlay.style.opacity = "1"; 
    
            isAtCenter = true;
        } else {
            cameraImg.style.bottom = "-400px"; 
            photoContainer.style.transform = "translateY(100%)"; 
            hideButtons();
    
            // 배경 원래 색으로 천천히 돌아가게 설정
            darkOverlay.style.transition = "background 2s ease, opacity 2s ease";
            darkOverlay.style.background = "rgba(0, 0, 0, 0)"; 
            darkOverlay.style.opacity = "0"; 
    
            isAtCenter = false;
        }
    };
    

    const hideButtons = () => {
        clickLeft.classList.remove("show");
        clickRight.classList.remove("show");
    };

    const showButtons = () => {
        clickLeft.classList.add("show");
        clickRight.classList.add("show");
    };

    cameraImg.addEventListener("click", toggleCameraPosition);

    document.addEventListener("keydown", (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
            toggleCameraPosition();
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

    document.addEventListener("keydown", (e) => {
        if (isAtCenter) {
            if (e.key === "ArrowLeft") {
                clickLeft.click();
            } else if (e.key === "ArrowRight") {
                clickRight.click();
            }
        }
    });
    
    updateImage();
});


    // Audio Player
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

document.addEventListener("DOMContentLoaded", () => {
    const cameraImg = document.querySelector(".DigitalCamera img");
    const clickLeft = document.querySelector(".click-left");
    const clickRight = document.querySelector(".click-right");
    const photos = document.querySelectorAll(".DigitalCamera .photo");
    const photoContainer = document.querySelector(".photo-container");
    const darkOverlay = document.querySelector(".dark-overlay");  // dark-overlay 선택자

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

    cameraImg.addEventListener("click", () => {
        if (!isAtCenter) {
            cameraImg.style.transition = "bottom 0.5s ease";
            cameraImg.style.bottom = "0px"; 

            photoContainer.style.transition = "transform 0.4s ease";
            photoContainer.style.transform = "translateY(-10%)"; 

            showButtons();

            // 배경을 어두운 색으로 변화
            darkOverlay.style.background = "radial-gradient(circle at 50% 50%, #f5f5f5, #525252 70%, #272727)"; 

            isAtCenter = true;
        } else {
            cameraImg.style.transition = "bottom 0.5s ease"; 
            cameraImg.style.bottom = "-400px"; 

            photoContainer.style.transition = "transform 0.4s ease"; 
            photoContainer.style.transform = "translateY(100%)"; 

            hideButtons();

            // 배경을 원래 색으로 돌아가게 설정
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

    document.addEventListener("keydown", (e) => {
        if (isAtCenter) { 
            if (e.key === "ArrowLeft") {
                currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
                updateImage();
            } else if (e.key === "ArrowRight") {
                currentImageIndex = (currentImageIndex + 1) % photos.length;
                updateImage();
            }
        }
    });

    updateImage();
});

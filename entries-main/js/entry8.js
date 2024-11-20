document.addEventListener("DOMContentLoaded", () => {
    const cameraImg = document.querySelector(".camera");
    const clickLeft = document.querySelector(".click-left");
    const clickRight = document.querySelector(".click-right");
    const cameraDiv = document.querySelector(".DigitalCamera");
    const imagePaths = [
        "../images/Boston1.jpg",
        "../images/Boston2.jpg",
        "../images/Boston3.jpg",
        "../images/Boston4.jpg",
        "../images/Boston5.jpg",
        "../images/Boston6.jpg",
        "../images/Boston7.jpg",
        "../images/Boston8.jpg"
    ];

    let currentImageIndex = 0;
    let isAtCenter = false;

    const updateImage = () => {
        // 배경 이미지 변경
        cameraDiv.style.backgroundImage = `url(${imagePaths[currentImageIndex]})`;
    };

    // 카메라를 클릭하면 카메라가 중앙으로 이동하고 버튼이 활성화
    cameraImg.addEventListener("click", () => {
        if (!isAtCenter) {
            cameraImg.style.bottom = "250px";
            cameraImg.style.transform = "translate(-50%, 50%)";
            clickLeft.classList.add("active");
            clickRight.classList.add("active");
            isAtCenter = true;
        } else {
            cameraImg.style.bottom = "-500px";
            cameraImg.style.transform = "translateX(-50%)";
            clickLeft.classList.remove("active");
            clickRight.classList.remove("active");
            isAtCenter = false;
        }
    });

    // 왼쪽 버튼 클릭 시
    clickLeft.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
        updateImage();
    });

    // 오른쪽 버튼 클릭 시
    clickRight.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
        updateImage();
    });

    // 방향키 왼쪽/오른쪽
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
            updateImage();
        } else if (e.key === "ArrowRight") {
            currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
            updateImage();
        }
    });
});

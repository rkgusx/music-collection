document.addEventListener("DOMContentLoaded", function() {
    const likeButton = document.querySelector(".like-btn");
    const likeIcon = document.querySelector("#like-icon");
    const filledIcon = document.querySelector("#like-filled-icon");
    const audioPlayer = document.getElementById("audio-player");

    likeButton.addEventListener("click", function() {
        likeButton.classList.toggle("active");

        if (audioPlayer.paused) {
            audioPlayer.play(); 
        } else {
            audioPlayer.pause();
        }

        if (likeIcon.style.display !== "none") {
            likeIcon.style.display = "none"; 
            filledIcon.style.display = "block"; 
        } else {
            likeIcon.style.display = "block"; 
            filledIcon.style.display = "none"; 
        }
    });

    audioPlayer.addEventListener("ended", () => {
        likeButton.classList.remove("active");
        likeIcon.style.display = "block";
        filledIcon.style.display = "none";
    });

    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 0;

    function moveToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`; 
        updateDots(index);
        toggleButtonsVisibility(index); 
    }

    function updateDots(index) {
        const dots = document.querySelectorAll('.dots span');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function createDots() {
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsContainer.appendChild(dot);
        });
        updateDots(currentIndex);
    }

    function toggleButtonsVisibility(index) {
        if (index === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
        } else if (index === images.length - 1) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveToSlide(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            moveToSlide(currentIndex);
        }
    });

    createDots();
    toggleButtonsVisibility(currentIndex);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            moveToSlide(currentIndex);
        } else if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
            currentIndex++;
            moveToSlide(currentIndex);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {

    const shareButton = document.querySelector(".share-btn");

    shareButton.addEventListener("click", function() {
        const pageUrl = window.location.href;

        navigator.clipboard.writeText(pageUrl).then(function() {
            alert("Page URL copied to clipboard!");
        }).catch(function(err) {
            console.error("Error copying URL: ", err);
        });
    });

});

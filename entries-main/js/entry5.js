const image = document.querySelector('.pixel-bg');
let position = 0;
const step = 20;

let currentDirection = 'standing';
let isMoving = false;

image.onload = () => {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const scale = Math.max(viewportHeight / imageHeight, viewportWidth / imageWidth);
    image.style.width = `${imageWidth * scale}px`;
    image.style.height = `${imageHeight * scale}px`;

    const maxLeft = 0;
    const minLeft = viewportWidth - image.offsetWidth;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            if (!isMoving) {
                updateCharacterDirection('left');
            }
            isMoving = true;
            position = Math.min(position + step, maxLeft);
            image.style.left = `${position}px`;
        } else if (event.key === 'ArrowRight') {
            if (!isMoving) {
                updateCharacterDirection('right');
            }
            isMoving = true;
            position = Math.max(position - step, minLeft);
            image.style.left = `${position}px`;
        } else if (event.code === 'Space') {
            event.preventDefault();
            jumpAnimation();
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            isMoving = false;
            updateCharacterDirection('standing');
        }
    });
};

function updateCharacterDirection(direction) {
    const character = document.getElementById('character');

    if (direction === 'left' && currentDirection !== 'left') {
        character.src = '../images/character-walkcycle-left.gif';
        currentDirection = 'left';
    } else if (direction === 'right' && currentDirection !== 'right') {
        character.src = '../images/character-walkcycle-right.gif';
        character.style.transform = 'scaleX(1)';
        currentDirection = 'right';
    } else if (direction === 'standing' && currentDirection !== 'standing') {
        if (currentDirection === 'left') {
            character.src = '../images/character-standing-left.gif';
        } else if (currentDirection === 'right') {
            character.src = '../images/character-standing-right.gif';
        } else {
            character.src = '../images/character-standing.gif';
        }
        currentDirection = 'standing';
    }
}

function jumpAnimation() {
    const character = document.getElementById('character');

    character.style.transition = 'transform 0.2s ease-in-out';
    character.style.transform = 'translateY(-30px)';

    setTimeout(() => {
        character.style.transform = 'translateY(0)';
    }, 200);
}

const audio = document.getElementById('GoodNight');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
let playing = false;

audio.volume = 0.7;

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
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();
    }
});

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

const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random(),
    };
}

function drawSnowflake(snowflake) {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
    ctx.fill();
}

function updateSnowflake(snowflake) {
    snowflake.y += snowflake.speed;
    if (snowflake.y > canvas.height) {
        snowflake.y = 0;
        snowflake.x = Math.random() * canvas.width;
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((snowflake) => {
        drawSnowflake(snowflake);
        updateSnowflake(snowflake);
    });
}

for (let i = 0; i < 200; i++) {
    snowflakes.push(createSnowflake());
}

function animate() {
    drawSnow();
    requestAnimationFrame(animate);
}

animate();

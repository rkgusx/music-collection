function setRandomOpacity() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(gridItem => {
        const randomOpacity = Math.random() * 0.7 + 0; 
        
        gridItem.style.opacity = randomOpacity;
    });
}

setInterval(setRandomOpacity, 2000);

const audio = document.getElementById('DontRunAway');
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
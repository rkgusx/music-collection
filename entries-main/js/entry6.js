const audio = document.getElementById('DontRunAway');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const pretzel = document.getElementById('pretzel');
const cafe = document.getElementById('cafe');
const audioPlayerContainer = document.querySelector('.audio-player-container');
let playing = false;
let isMainScreen = false;

pretzel.addEventListener('click', () => {
    isMainScreen = !isMainScreen;

    if (isMainScreen) {
        pretzel.classList.add('small');
        cafe.classList.remove('hidden');
        cafe.classList.add('visible');
        console.log('Cafe image should be visible');
        audioPlayerContainer.classList.remove('hidden');
        audioPlayerContainer.classList.add('visible');
        audio.play();
        playing = true;
        playButton.classList.add('playing');
    } else {
        pretzel.classList.remove('small');
        cafe.classList.add('hidden');
        cafe.classList.remove('visible');
        console.log('Cafe image should be hidden');
        audioPlayerContainer.classList.add('hidden');
        audioPlayerContainer.classList.remove('visible');
        audio.pause();
        playing = false;
        playButton.classList.remove('playing');
    }
});

playButton.addEventListener('click', togglePlay);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();

        pretzel.classList.toggle('small'); 

        isMainScreen = !isMainScreen;
        if (isMainScreen) {
            cafe.classList.add('visible');
            cafe.classList.remove('hidden');
        } else {
            cafe.classList.remove('visible');
            cafe.classList.add('hidden');
        }
    }
});

progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
});

audio.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    progress.style.width = (current / audio.duration) * 100 + '%';
    currentTime.textContent = formatTime(current);
    
    const remainingTime = audio.duration - current;
    durationTime.textContent = formatTime(remainingTime);
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

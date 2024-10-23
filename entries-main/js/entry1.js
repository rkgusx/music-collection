const audio = document.getElementById('LostStarsAudio');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const lyricsDiv = document.getElementById('lyrics');

let playing = false;

const lyricsData = [
    { time: 11.5, text: "Please, don't see" },
    { time: 16.5, text: "Just a boy caught up in dreams and fantasies" },
    { time: 23.5, text: "Please, see me" },
    { time: 28.5, text: "Reaching out for someone I can't see" },
    { time: 33.5, text: "Take my hand\nLet's see where we wake up tomorrow" },
    { time: 39.5, text: "Best laid plans\nSometimes are just a one night stand" },
    { time: 45.5, text: "I'll be damned\nCupid's demanding back his arrow" },
    { time: 51.5, text: "So let's get drunk on our tears" },
    { time: 58.5, text: "And, God, tell us the reason" },
    { time: 62.5, text: "Youth is wasted on the young" },
    { time: 66.5, text: "It's hunting season and the lambs are on the run" },
    { time: 72.5, text: "Searching for meaning" },
    { time: 75.5, text: "But are we all lost stars" },
    { time: 81.5, text: "Trying to light up the dark?" },
    { time: 87.5, text: "Who are we?" },
    { time: 93.5, text: "Just a speck of dust within the galaxy" },
    { time: 99.5, text: "Woe is me" },
    { time: 104.5, text: "If we're not careful turns into reality" },
    { time: 109.5, text: "Don't you dare let our best memories bring you sorrow" },
    { time: 115.5, text: "Yesterday I saw a lion kiss a deer" },
    { time: 121.5, text: "Turn the page\nMaybe we'll find a brand new ending" },
    { time: 128.5, text: "Where we're dancing in our tears" },
    { time: 134.5, text: "And, God, tell us the reason" },
    { time: 138.5, text: "Youth is wasted on the young" },
    { time: 142.5, text: "It's hunting season" },
    { time: 144.5, text: "And the lambs are on the run" },
    { time: 148.5, text: "Searching for meaning" },
    { time: 152.5, text: "But are we all lost stars" },
    { time: 157.5, text: "Trying to light up the dark?" },
    { time: 163.5, text: "And I thought I saw you out there crying" },
    { time: 169.5, text: "And I thought I heard you call my name" },
    { time: 175.5, text: "And I thought I heard you out there crying" },
    { time: 180.5, text: "Just the same" },
    { time: 183.5, text: "Oh yeah, yeah yeah yeah yeah" },
    { time: 187.5, text: "God, give us the reason" },
    { time: 191.5, text: "Youth is wasted on the young" },
    { time: 195.5, text: "It's hunting season and this lamb is on the run" },
    { time: 200.5, text: "Searching for meaning" },
    { time: 205.5, text: "But are we all lost stars" },
    { time: 211.5, text: "Trying to light up the dark?" },
    { time: 217.5, text: "And I thought I saw you out there crying" },
    { time: 222.5, text: "And I thought I heard you call my name" },
    { time: 228.5, text: "And I thought I heard you out there crying" },
    { time: 233.5, text: "But are we all lost stars" },
    { time: 239.5, text: "Trying to light up the dark?" },
    { time: 245.5, text: "But are we all lost stars" },
    { time: 250.5, text: "Trying to light up the dark?" }
];

audio.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    progress.style.width = (current / audio.duration) * 100 + '%';
    currentTime.textContent = formatTime(current);
    updateRemainingTime();
    displayLyrics(current);
});

playButton.addEventListener('click', () => {
    playing ? pauseAudio() : playAudio();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        playing ? pauseAudio() : playAudio();
    }
});

progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    audio.currentTime = percent * audio.duration;
});

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

function updateRemainingTime() {
    const remaining = audio.duration - audio.currentTime;
    durationTime.textContent = formatTime(remaining);
}

function displayLyrics(currentTime) {
    let currentLyric = null;
    for (let i = 0; i < lyricsData.length; i++) {
        const lyric = lyricsData[i];
        const nextLyricTime = lyricsData[i + 1] ? lyricsData[i + 1].time : audio.duration;
        
        if (currentTime >= lyric.time && currentTime < nextLyricTime) {
            currentLyric = lyric.text;
            break;
        }
    }
    
    if (currentLyric && lyricsDiv.innerHTML !== currentLyric) {
        lyricsDiv.innerHTML = currentLyric;
        lyricsDiv.style.display = 'block'; 
    }
}

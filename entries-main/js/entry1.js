const audio = document.getElementById('LostStarsAudio');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const lyricsDiv = document.getElementById('lyrics');

let playing = false;

const lyricsData = [
    { time: 11.4, text: "Please, don't see" },
    { time: 16.4, text: "Just a boy caught up in dreams and fantasies" },
    { time: 23.4, text: "Please, see me" },
    { time: 28.4, text: "Reaching out for someone I can't see" },
    { time: 33.4, text: "Take my hand\nLet's see where we wake up tomorrow" },
    { time: 39.4, text: "Best laid plans\nSometimes are just a one night stand" },
    { time: 45.4, text: "I'll be damned\nCupid's demanding back his arrow" },
    { time: 51.4, text: "So let's get drunk on our tears" },
    { time: 58.4, text: "And, God, tell us the reason" },
    { time: 62.4, text: "Youth is wasted on the young" },
    { time: 66.4, text: "It's hunting season and the lambs are on the run" },
    { time: 72.4, text: "Searching for meaning" },
    { time: 75.4, text: "But are we all lost stars" },
    { time: 81.4, text: "Trying to light up the dark?" },
    { time: 87.4, text: "Who are we?" },
    { time: 93.4, text: "Just a speck of dust within the galaxy" },
    { time: 99.4, text: "Woe is me" },
    { time: 104.4, text: "If we're not careful turns into reality" },
    { time: 109.4, text: "Don't you dare let our best memories bring you sorrow" },
    { time: 115.4, text: "Yesterday I saw a lion kiss a deer" },
    { time: 121.4, text: "Turn the page\nMaybe we'll find a brand new ending" },
    { time: 128.4, text: "Where we're dancing in our tears" },
    { time: 134.4, text: "And, God, tell us the reason" },
    { time: 138.4, text: "Youth is wasted on the young" },
    { time: 142.4, text: "It's hunting season" },
    { time: 144.4, text: "And the lambs are on the run" },
    { time: 148.4, text: "Searching for meaning" },
    { time: 152.4, text: "But are we all lost stars" },
    { time: 157.4, text: "Trying to light up the dark?" },
    { time: 163.4, text: "And I thought I saw you out there crying" },
    { time: 169.4, text: "And I thought I heard you call my name" },
    { time: 175.4, text: "And I thought I heard you out there crying" },
    { time: 180.4, text: "Just the same" },
    { time: 183.4, text: "Oh yeah, yeah yeah yeah yeah" },
    { time: 187.4, text: "God, give us the reason" },
    { time: 191.4, text: "Youth is wasted on the young" },
    { time: 195.4, text: "It's hunting season and this lamb is on the run" },
    { time: 200.4, text: "Searching for meaning" },
    { time: 205.4, text: "But are we all lost stars" },
    { time: 211.4, text: "Trying to light up the dark?" },
    { time: 217.4, text: "And I thought I saw you out there crying" },
    { time: 222.4, text: "And I thought I heard you call my name" },
    { time: 228.4, text: "And I thought I heard you out there crying" },
    { time: 233.4, text: "But are we all lost stars" },
    { time: 239.4, text: "Trying to light up the dark?" },
    { time: 245.4, text: "But are we all lost stars" },
    { time: 250.4, text: "Trying to light up the dark?" }
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

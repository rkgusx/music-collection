const audio = document.getElementById('LostStarsAudio');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const lyricsContainer = document.getElementById('lyrics');

const lyrics = [
    { time: 12, text: "Please, don't see" },
    { time: 17, text: "Just a boy caught up in dreams and fantasies" },
    { time: 24, text: "Please, see me" },
    { time: 29, text: "Reaching out for someone I can't see" },
    { time: 34, text: "Take my hand\nLet's see where we wake up tomorrow" },
    { time: 40, text: "Best laid plans\nSometimes are just a one night stand" },
    { time: 46, text: "I'll be damned\nCupid's demanding back his arrow" },
    { time: 52, text: "So let's get drunk on our tears" },
    { time: 59, text: "And, God, tell us the reason" },
    { time: 63, text: "Youth is wasted on the young" },
    { time: 67, text: "It's hunting season and the lambs are on the run" },
    { time: 73, text: "Searching for meaning" },
    { time: 76, text: "But are we all lost stars\nTrying to light up the dark?" },
    { time: 84, text: "Who are we?" },
    { time: 89, text: "Just a speck of dust within the galaxy" },
    { time: 93, text: "Woe is me" },
    { time: 97, text: "If we're not careful turns into reality" },
    { time: 101, text: "Don't you dare let our best memories bring you sorrow" },
    { time: 106, text: "Yesterday I saw a lion kiss a deer" },
    { time: 112, text: "Turn the page\nMaybe we'll find a brand new ending" },
    { time: 118, text: "Where we're dancing in our tears" },
    { time: 124, text: "And, God, tell us the reason" },
    { time: 129, text: "Youth is wasted on the young" },
    { time: 134, text: "It's hunting season and this lamb's on the run" },
    { time: 140, text: "Searching for meaning" },
    { time: 145, text: "But are we all lost stars\nTrying to light up the dark?" },
];

let playing = false;
let currentLyricIndex = -1; // 현재 가사의 인덱스

audio.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    progress.style.width = (current / audio.duration) * 100 + '%';
    currentTime.textContent = formatTime(current);
    updateLyrics(current);
    updateRemainingTime(); // 남은 시간 업데이트
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

function updateLyrics(currentTime) {
    const index = lyrics.findIndex(line => currentTime >= line.time);
    if (index !== currentLyricIndex && index >= 0) {
        currentLyricIndex = index; // 현재 가사 인덱스 업데이트
        lyricsContainer.innerHTML = ''; // 기존 가사 지우기

        // 새로운 가사 라인 생성
        const lyricLine = document.createElement('div');
        lyricLine.innerText = lyrics[index].text;
        lyricLine.style.opacity = '0'; // 초기 투명도 설정
        lyricsContainer.appendChild(lyricLine);
        
        // 디졸브 효과 추가
        setTimeout(() => {
            lyricLine.style.transition = 'opacity 1s ease';
            lyricLine.style.opacity = '1'; // 가사를 보이게 설정
        }, 100); // 약간의 지연 후 디졸브 시작

        // 이전 가사 지우기
        setTimeout(() => {
            lyricsContainer.innerHTML = ''; // 가사를 모두 지운 후
        }, 2000); // 2초 후에 이전 가사를 지움 (디졸브 효과 지속 시간에 따라 조절)
    }
}

// 남은 시간을 업데이트하는
function updateRemainingTime() {
    const remaining = audio.duration - audio.currentTime;
    durationTime.textContent = formatTime(remaining);
}

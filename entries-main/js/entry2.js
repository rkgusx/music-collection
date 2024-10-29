const koalaNose = document.querySelector('.koala_nose');
const backgroundImage = document.getElementById('background-image');
const backgroundVideo = document.getElementById('background-video');
const koalaImage = document.getElementById('koala-image');
const audio = document.getElementById('audio');
let isPlaying = false;

function toggleBackgroundAndAudio() {
    if (isPlaying) {
        backgroundImage.style.opacity = '1';
        backgroundVideo.style.opacity = '0';
        audio.pause();
        koalaImage.src = '../images/koala.png';
        backgroundVideo.pause();
    } else {
        backgroundImage.style.opacity = '0';
        backgroundVideo.style.opacity = '1';
        audio.play();
        koalaImage.src = '../images/koala-eyes-closed.png';
        backgroundVideo.play();
    }
    isPlaying = !isPlaying;
}

koalaNose.addEventListener('click', toggleBackgroundAndAudio);

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        toggleBackgroundAndAudio();
    }
});

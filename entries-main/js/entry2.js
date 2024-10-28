const koalaNose = document.querySelector('.koala_nose');
const backgroundImage = document.getElementById('background-image');
const backgroundVideo = document.getElementById('background-video');
const koalaImage = document.getElementById('koala-image');
const audio = document.getElementById('audio');
let isPlaying = false; // 현재 상태를 추적하는 변수

function toggleBackgroundAndAudio() {
    if (isPlaying) {
        // 현재 상태가 재생 중이면
        backgroundImage.style.opacity = '1'; // 배경 이미지로 전환
        backgroundVideo.style.opacity = '0'; // 비디오 숨김
        audio.pause(); // 오디오 멈춤
        koalaImage.src = '../images/koala.png'; // 원래 koala 이미지로 변경
        backgroundVideo.pause(); // 비디오 멈춤
    } else {
        // 현재 상태가 정지 중이면
        backgroundImage.style.opacity = '0'; // 비디오로 전환
        backgroundVideo.style.opacity = '1'; // 비디오 보이기
        audio.play(); // 오디오 재생
        koalaImage.src = '../images/koala-eyes-closed.png'; // koala-eyes-closed 이미지로 변경
        backgroundVideo.play(); // 비디오 재생
    }
    isPlaying = !isPlaying; // 상태 반전
}

// koala-nose 클릭 이벤트
koalaNose.addEventListener('click', toggleBackgroundAndAudio);

// 스페이스 바 누르면 koala_nose 클릭 이벤트 트리거
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // 스페이스 바의 기본 동작 방지
        toggleBackgroundAndAudio(); // 상태 전환 함수 호출
    }
});

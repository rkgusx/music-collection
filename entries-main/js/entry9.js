function changeImages() {
    // 이미지 요소들 가져오기
    const starBefore = document.querySelector('.star-before');
    const starAfter = document.querySelector('.star-after');
    const treeBefore = document.querySelector('.tree-before');
    const treeAfter = document.querySelector('.tree-after');
    const message = document.querySelector('#message'); // h2 요소
    const decorations = document.querySelectorAll('.christmas-deco'); // 크리스마스 장식들
    
    // star-before가 보일 때
    if (starBefore.style.display !== 'none') {
        // 'Before' 상태를 숨기고 'After' 상태를 보이게 변경
        starBefore.style.display = 'none';
        starAfter.style.display = 'block';
        treeBefore.style.display = 'none';
        treeAfter.style.display = 'block';
        
        // h2 보이기 (서서히 나타나도록 opacity 조정)
        message.style.display = 'block'; // h2 표시
        setTimeout(() => {
            message.style.opacity = 1; // 서서히 보이도록 설정
        }, 10);
        
        // 크리스마스 장식들 보이기 (서서히 나타나도록 opacity 조정)
        decorations.forEach(deco => {
            deco.style.display = 'block'; // display는 먼저 설정
            setTimeout(() => {
                deco.style.opacity = 1; // 서서히 나타나도록 설정
            }, 10);
        });
    } else {
        // 'After' 상태를 숨기고 'Before' 상태를 보이게 변경
        starBefore.style.display = 'block';
        starAfter.style.display = 'none';
        treeBefore.style.display = 'block';
        treeAfter.style.display = 'none';
        
        // h2 숨기기 (서서히 사라지도록 opacity 조정)
        message.style.opacity = 0;
        setTimeout(() => {
            message.style.display = 'none'; // 완전히 숨김
        }, 1000); // 애니메이션 시간이 지난 후 숨김
        
        // 크리스마스 장식들 숨기기 (서서히 사라지도록 opacity 조정)
        decorations.forEach(deco => {
            deco.style.opacity = 0; // 서서히 사라지도록 설정
            setTimeout(() => {
                deco.style.display = 'none'; // 완전히 숨김
            }, 1000); // 애니메이션 시간이 지난 후 숨김
        });
    }
}

function changeImages() {
    const starBefore = document.querySelector('.star-before');
    const starAfter = document.querySelector('.star-after');
    const treeBefore = document.querySelector('.tree-before');
    const treeAfter = document.querySelector('.tree-after');
    const message = document.querySelector('#message');
    const decorations = document.querySelectorAll('.christmas-deco');
    const snowMusic = document.getElementById('snow-music');
    const arrow = document.querySelector('.arrow');
    const h3 = document.querySelector('h3');
    const home = document.querySelector('.home');

    if (starBefore.style.display !== 'none') {
        starBefore.style.display = 'none';
        starAfter.style.display = 'block';
        treeBefore.style.display = 'none';
        treeAfter.style.display = 'block';

        message.style.display = 'block';
        setTimeout(() => {
            message.style.opacity = 1;
        }, 10);

        decorations.forEach(deco => {
            deco.style.display = 'block';
            setTimeout(() => {
                deco.style.opacity = 1;
            }, 10);
        });

        arrow.style.display = 'none';
        h3.style.display = 'none';
        home.style.display = 'none';
    } else {

        starBefore.style.display = 'block';
        starAfter.style.display = 'none';
        treeBefore.style.display = 'block';
        treeAfter.style.display = 'none';

        message.style.opacity = 0;
        setTimeout(() => {
            message.style.display = 'none';
        }, 1000);

        decorations.forEach(deco => {
            deco.style.opacity = 0;
            setTimeout(() => {
                deco.style.display = 'none';
            }, 1000);
        });

        arrow.style.display = 'block';
        h3.style.display = 'block';
        home.style.display = 'block';
    }

    if (snowMusic.paused) {
        snowMusic.play();
    } else {
        snowMusic.pause();
    }
}
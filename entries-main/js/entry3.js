window.addEventListener('load', function () {
    setTimeout(function () {

        const start = window.scrollY;
        const end = 100;
        const duration = 1000;
        let startTime = null;

        function scrollAnimation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, start + (end - start) * easeOut);

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            } else {

                document.body.style.overflow = 'hidden';
            }
        }

        requestAnimationFrame(scrollAnimation);
    }, 800);
});

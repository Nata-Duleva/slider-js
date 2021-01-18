(function () {
    const container = document.querySelector('#carousel');
    const slides = container.querySelectorAll('.slide');
    const indicatorsContainer = container.querySelector('#indicators-container');
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    const pauseBtn = container.querySelector('#pause-btn');
    const prevBtn = container.querySelector('#prev-btn');
    const nextBtn = container.querySelector('#next-btn');

    const FA_PLAY = '<i class="far fa-play-circle">';
    const FA_PAUSE = '<i class="far fa-pause-circle">';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';
    const SPACE = ' ';

    let currentSlide = 0;
    let slidesCount = slides.length;
    let isPlaing = true;
    let timerID = null;
    let swipeStartX = null;
    let swipeEndX = null;

    function gotoNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slidesCount) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }

    const gotoPrev = () => gotoNth(currentSlide - 1);

    const gotoNext = () => gotoNth(currentSlide + 1);

    function pause() {
        if (isPlaing) {
            clearInterval(timerID);
            pauseBtn.innerHTML = FA_PLAY;
            isPlaing = false;
        }
    }

    function play() {
        timerID = setInterval(gotoNext, 2000);
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaing = true;
    }

    const pausePlay = () => isPlaing ? pause() : play();
    function next() {
        pause();
        gotoNext();
    }

    function prev() {
        pause();
        gotoPrev();
    }

    function indicate(e) {
        let target = e.target;
        if (target.classList.contains('indicator')) {
            pause();
            gotoNth(+target.getAttribute('data-slide-to'));
        }
    }

    function pressKey(e) {
        if (e.key === LEFT_ARROW) prev();
        if (e.key === RIGHT_ARROW) next();
        if (e.key === SPACE) pausePlay();
    }

    function swipeStart(e) {
        swipeStartX = e.changedTouches[0].pageX;
    }

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 100 && next();
        swipeStartX - swipeEndX < 100 && prev();
    }

    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    document.addEventListener('touchstart', swipeStart);
    document.addEventListener('touchend', swipeEnd);
    timerID = setInterval(gotoNext, 2000);
}())
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentIndex += direction;

    // garantir não ultrapassar os slides a direita
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // garantir que não ultrapasse o limite da esquerda
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    // mover o slide
    const slidesContainer = document.querySelector('#slides');
    const larguraSlide = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(-${currentIndex * larguraSlide}px)`;
}

const btnPrevious = document.querySelector('#previous');
btnPrevious.onclick = function() {
    moveSlide(-1);
}

const btnNext = document.querySelector('#next');
btnNext.onclick = function() {
    moveSlide(1);
}
let indiceAtual = 0;

function moverSlide(direcao) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    indiceAtual += direcao;

    // caso ele ultrapasse o limite a direita
    if (indiceAtual >= totalSlides) {
        indiceAtual = 0;
    }
    // caso ele ultrapasse o limite da esquerda
    if (indiceAtual < 0) {
        indiceAtual = totalSlides - 1;
    }

    const slidesContainer = document.querySelector('#slides');
    const larguraSlide = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(-${indiceAtual * larguraSlide}px)`;
}

const btnPrevious = document.querySelector('.previous');
btnPrevious.onclick = function() {
    moverSlide(-1);
}

const btnNext = document.querySelector('.next');
btnNext.onclick = function() {
    moverSlide(1);
}
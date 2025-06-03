let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
}
function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((slide) => slide.style.display = 'none');
        dots.forEach((dot) => dot.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusOrMinusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusOrMinusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusOrMinusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 1; i <= dots.length; i++) {
            if (event.target && event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
}

export {slider};
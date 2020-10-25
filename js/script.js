// wait untill whole page loaded, including images
// window.addEventListener('load', function(){});

// wait untill loaded DOM excluding e.g. images
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        tabsParentContainer = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(startIndex) {
        for (let i = startIndex; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    // hide every tab (starting from 1-index) except 0-index tab
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.add('show');
            tabContent[b].classList.remove('hide');
        }
    }

    tabsParentContainer.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer -----------------------------------------------------------
    let deadline = '2020-10-21';

    // Calculate remaining time
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60));
        //let days = Math.floor((t/1000/60/60/24));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            // 'days': days
        };
    }

    // Set clock
    function setClock(id, endtime) {
        let timer = document.getElementById('timer'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        // Layout updater
        function updateClock() {
            let t = getTimeRemaining(endtime);

            // Manipulate DOM

            // hours
            if (t.hours < 10 && t.hours >= 0) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }

            // minutes
            if (t.minutes < 10 && t.minutes >= 0) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            // seconds
            if (t.seconds < 10 && t.seconds >= 0) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }

            // If deadline have reached
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

        let timeInterval = setInterval(updateClock, 1000);

    }
    setClock('timer', deadline);

    // Popup window -----------------------------------------------------------
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        generalParent = document.querySelector('div.content'),
        body = document.querySelector('body');

    generalParent.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target == more || target.classList.contains('description-btn')) {
            overlay.style.display = 'block';
            target.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });


    body.addEventListener('click', function (event) {
        let target = event.target,
            clickedButton = document.querySelector('.more-splash');
        if (target && target == close) {
            overlay.style.display = 'none';
            clickedButton.classList.remove('more-splash');
            document.body.style.overflow = '';
        }
    });

    // Form and Promise ----------------------------------------------------
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        statusMessage = document.createElement('div'),
        contactForm = document.querySelector('#form');

    statusMessage.classList.add('status');

    function createFormData(target) {
        return new Promise(function(resolve) {
            target.appendChild(statusMessage);
            let formData = new FormData(target);
            resolve(formData);
        });
    }

    function postData(formData) {
        return new Promise(function(resolve, reject) {
           
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.onreadystatechange = function() {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.status == 200 && request.readyState === 4) {
                    resolve();
                } else { 
                    reject();
                }
            };

            request.send(json);
            // request.send(formData);
        });
    }

    function clearInput(target) {
        return new Promise( function(resolve) {
            let input = target.getElementsByTagName('input');
            for (let i = 0; i < input.length; i++) {
                input[i].value = ''; 
            }
            resolve();
        });
    }

    body.addEventListener('submit', function (event) {
        let target = event.target;
        if (target && target == form || target == contactForm) {
            event.preventDefault();
            createFormData(target)
            // data from previous promise resolve(data) as (arrow) function argument is neccesary to pass to next function
            .then(formData => postData(formData)) 
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            // multiple .then don't change the resolve() result. And it's not chaining
            .catch(() => statusMessage.innerHTML = message.failure)
            // will be executed anyway if after catch()
            .then(clearInput(target));
        }
    });

    // Slider --------------------------------------------------------

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

    prev.addEventListener('click', function() {
        plusOrMinusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusOrMinusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i = 1; i <= dots.length; i++) {
            if (event.target && event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // Calculator ------------------------------------------------

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;
    
    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});
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

    tabsParentContainer.addEventListener('click', function(event) {
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
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));
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

});
function timer() {
    let deadline = '2020-11-21';

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
}

export {timer};
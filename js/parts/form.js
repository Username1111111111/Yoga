function form() {
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
        return new Promise(function (resolve) {
            target.appendChild(statusMessage);
            let formData = new FormData(target);
            resolve(formData);
        });
    }

    function postData(formData) {
        return new Promise(function (resolve, reject) {

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.onreadystatechange = function () {
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
        return new Promise(function (resolve) {
            let input = target.getElementsByTagName('input');
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
            resolve();
        });
    }

    document.querySelector('body').addEventListener('submit', function (event) {
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
}
export {form};
function modal() {
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


    document.querySelector('body').addEventListener('click', function (event) {
        let target = event.target,
            clickedButton = document.querySelector('.more-splash');
        if (target && target == close) {
            overlay.style.display = 'none';
            clickedButton.classList.remove('more-splash');
            document.body.style.overflow = '';
        }
    });
}
export {modal};
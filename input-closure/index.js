const inputFields = document.querySelectorAll('.input');
const prevButtons = document.querySelectorAll('.btn-prev');
const nextButtons = document.querySelectorAll('.btn-next');

inputFields.forEach((input, i) => {
    inputHistory(input, prevButtons[i], nextButtons[i]);
});

function inputHistory(input, prevButtons, nextButtons) {
    let inputHistory = [];
    let currentEl = -1;

    input.addEventListener('change', function () {
        inputHistory.push(this.value);
        currentEl = inputHistory.length - 1;

        if (inputHistory.length >= 2) {
            prevButtons.disabled = false;
        }

        nextButtons.disabled = true;
    });

    prevButtons.addEventListener('click', function () {
        if (currentEl === 1) {
            prevButtons.disabled = true;
        }

        if (currentEl > 0) {
            currentEl--;
            input.value = inputHistory[currentEl];
            nextButtons.disabled = false;
        }
    });

    nextButtons.addEventListener('click', function () {
        if (currentEl === inputHistory.length - 2) {
            nextButtons.disabled = true;
        }

        if (currentEl < inputHistory.length - 1) {
            currentEl++;
            input.value = inputHistory[currentEl];
            prevButtons.disabled = false;
        }
    });
}
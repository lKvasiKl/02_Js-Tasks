const inputWrappers = document.querySelectorAll('[data-input-wrapper]');

const direction = {
    PREV: 'prev',
    NEXT: 'next',
}

inputWrappers.forEach(inputWrapper => {
    const inputField = inputWrapper.querySelector('[data-input]');
    const prevButton = inputWrapper.querySelector('[data-prev-btn]');
    const nextButton = inputWrapper.querySelector('[data-next-btn]');

    const { addToHistory, btnAction } = inputHistoryManager(inputField, prevButton, nextButton);

    const inputHandler = () => addToHistory();
    const btnPrevHandler = () => btnAction(direction.PREV);
    const btnNextHandler = () => btnAction(direction.NEXT);

    inputField?.addEventListener('change', inputHandler);
    prevButton?.addEventListener('click', btnPrevHandler);
    nextButton?.addEventListener('click', btnNextHandler);
});

function inputHistoryManager(input, prevButton, nextButton) {
    let inputHistory = [];
    let currentEl;

    const prev = () => {
        currentEl--;
        nextButton.disabled = false;
    }

    const next = () => {
        currentEl++;
        prevButton.disabled = false;
    }

    const show = () => {
        input.value = inputHistory[currentEl];
    }

    const disableBtn = () => {
        prevButton.disabled = currentEl === 0;
        nextButton.disabled = currentEl === inputHistory.length - 1;
    }

    const option = {
        [direction.PREV]: prev,
        [direction.NEXT]: next,
    }

    return {
        addToHistory() {
            inputHistory.push(input.value);
            currentEl = inputHistory.length - 1;

            prevButton.disabled = !(inputHistory.length >= 2);
        },
        btnAction(direction) {
            option[direction]();
            show();
            disableBtn();
        }
    };
}
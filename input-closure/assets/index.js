const inputWrappers = document.querySelectorAll('[data-input-wrapper]');

inputWrappers.forEach(inputWrapper => {
    const [inputField, prevButton, nextButton] = inputWrapper.querySelectorAll('[data-input], [data-prev-btn], [data-next-btn]');

    const manager = inputHistoryManager(inputField, prevButton, nextButton);

    if (inputField) {
        inputField.addEventListener('change', () => manager.addToHistory());
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => manager.show('previous'));
    };

    if (nextButton) {
        nextButton.addEventListener('click', () => manager.show('next'));
    };
});

function inputHistoryManager(input, prevButton, nextButton) {
    let inputHistory = [];
    let currentEl;

    return {
        addToHistory: function () {
            inputHistory.push(input.value);
            currentEl = inputHistory.length - 1;

            prevButton.disabled = !(inputHistory.length >= 2);
        },
        show: (direction) => {
            if (direction === 'previous') {
                currentEl--;
                nextButton.disabled = false;
            } else if (direction === 'next') {
                currentEl++;
                prevButton.disabled = false;
            }

            input.value = inputHistory[currentEl];

            prevButton.disabled = currentEl === 0;
            nextButton.disabled = currentEl === inputHistory.length - 1;
        }
    };
}
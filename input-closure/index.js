const inputs = document.querySelectorAll('.input');
const btnsPrev = document.querySelectorAll('.btn-prev');
const btnsNext = document.querySelectorAll('.btn-next');


for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function () {
        let inputHistory = [];

        return function () {
            inputHistory.push(this.value);

            let currentEl = inputHistory.length - 1;

            if (inputHistory.length >= 2) {
                btnsPrev[i].disabled = false;
            }

            btnsPrev[i].addEventListener('click', () => {
                btnsNext[i].disabled = false;
                
                if (currentEl > 0) {
                    currentEl--;
                    inputs[i].value = inputHistory[currentEl];
                }
            });

            btnsNext[i].addEventListener('click', () => {
                btnsPrev[i].disabled = false;

                if (currentEl === inputHistory.length - 2) {
                    btnsNext[i].disabled = true;
                }

                if (currentEl < inputHistory.length - 1) {
                    currentEl++;
                    inputs[i].value = inputHistory[currentEl];
                }
            });
        };
    }());
}
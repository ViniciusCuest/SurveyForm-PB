"use strict";
const buttonSubmit = document.getElementById('submit');
const buttonBack = document.getElementById('back');
const buttonNext = document.getElementById('next');
const textarea = document.getElementById('textarea');
const couterCharacter = document.getElementById('characters-quantity');
if (textarea)
    couterCharacter.innerHTML = String(textarea.maxLength);
textarea === null || textarea === void 0 ? void 0 : textarea.addEventListener('keyup', () => {
    couterCharacter.innerHTML = `${textarea.maxLength - textarea.value.length}`;
    textarea.value = textarea.value.slice(0, textarea.maxLength);
});
buttonBack === null || buttonBack === void 0 ? void 0 : buttonBack.addEventListener('click', () => {
    window.history.back();
});
buttonNext === null || buttonNext === void 0 ? void 0 : buttonNext.addEventListener('click', () => {
    const radio = document.getElementsByName('radio');
    const checkbox = document.getElementsByName('checkbox');
    const select = document.getElementById('select-option');
    if ((textarea === null || textarea === void 0 ? void 0 : textarea.value.length) !== 0) {
        navigation('submit');
    }
    let selectedRadioValue = null;
    let checkedValues = [];
    if (radio) {
        radio.forEach((item) => {
            if (item.checked)
                localStorage.setItem('poll', JSON.stringify({ markets: item.value, status: select === null || select === void 0 ? void 0 : select.value }));
            navigation('poll2');
            return;
        });
    }
    if (checkbox) {
        checkbox.forEach((item) => {
            if (item.checked)
                localStorage.setItem('poll2', JSON.stringify({ training_resourses: item.value, invest_status: select === null || select === void 0 ? void 0 : select.value }));
            navigation('details');
            return;
        });
    }
});
function submit() {
    console.log(JSON.parse(String(localStorage.getItem('poll'))));
}
function navigation(route) {
    window.location.href = `${route}.html`;
}

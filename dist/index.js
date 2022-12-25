"use strict";
const buttonSubmit = document.getElementById('submit');
const buttonBack = document.getElementById('back');
const buttonNext = document.getElementById('next');
const textarea = document.getElementById('textarea');
const couterCharacter = document.getElementById('characters-quantity');
const full_name = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
age === null || age === void 0 ? void 0 : age.addEventListener('keyup', () => {
    age.value = characterLimiter(age);
});
if (textarea)
    couterCharacter.innerHTML = String(textarea.maxLength);
textarea === null || textarea === void 0 ? void 0 : textarea.addEventListener('keyup', () => {
    couterCharacter.innerHTML = `${textarea.maxLength - textarea.value.length}`;
    textarea.value = characterLimiter(textarea);
});
buttonBack === null || buttonBack === void 0 ? void 0 : buttonBack.addEventListener('click', () => {
    window.history.back();
});
buttonNext === null || buttonNext === void 0 ? void 0 : buttonNext.addEventListener('click', () => {
    const radio = document.getElementsByName('radio');
    const checkbox = document.getElementsByName('checkbox');
    const select = document.getElementById('select-option');
    if (textarea) {
        if (!textarea.value.length) {
            textarea.classList.add('error');
            setTimeout(() => {
                textarea.classList.remove('error');
            }, 500);
            return;
        }
        localStorage.setItem('details', String(textarea === null || textarea === void 0 ? void 0 : textarea.value));
        navigation('submit');
        return;
    }
    if (radio) {
        radio.forEach((item) => {
            if (item.checked) {
                localStorage.setItem('poll', JSON.stringify({
                    markets: item.value,
                    status: select === null || select === void 0 ? void 0 : select.value
                }));
                navigation('poll2');
                return;
            }
        });
    }
    if (checkbox.length) {
        let data = [];
        checkbox.forEach((item) => {
            if (item.checked)
                data.push(item.value);
        });
        localStorage.setItem('poll2', JSON.stringify({
            resourses: data,
            invest_status: select === null || select === void 0 ? void 0 : select.value
        }));
        navigation('details');
        return;
    }
});
buttonSubmit === null || buttonSubmit === void 0 ? void 0 : buttonSubmit.addEventListener('click', () => {
    var _a, _b, _c, _d;
    let retrievedData = {
        full_name: String(full_name === null || full_name === void 0 ? void 0 : full_name.value),
        email: String(email === null || email === void 0 ? void 0 : email.value),
        age: Number(age === null || age === void 0 ? void 0 : age.value),
        markets: (_a = JSON.parse(String(localStorage.getItem('poll')))) === null || _a === void 0 ? void 0 : _a.markets,
        account_status: (_b = JSON.parse(String(localStorage.getItem('poll')))) === null || _b === void 0 ? void 0 : _b.status,
        invest_status: (_c = JSON.parse(String(localStorage.getItem('poll2')))) === null || _c === void 0 ? void 0 : _c.invest_status,
        resourses: (_d = JSON.parse(String(localStorage.getItem('poll2')))) === null || _d === void 0 ? void 0 : _d.resourses,
        comment_detail: String(localStorage.getItem('details'))
    };
    localStorage.clear();
});
function navigation(route) {
    window.location.href = `${route}.html`;
}
function characterLimiter(element) {
    return String(element.value.slice(0, element.maxLength));
}

const buttonSubmit = document.getElementById('submit')! as HTMLButtonElement | undefined;
const buttonBack = document.getElementById('back')! as HTMLButtonElement | undefined;
const buttonNext = document.getElementById('next')! as HTMLButtonElement | undefined;

const textarea = document.getElementById('textarea') as HTMLTextAreaElement | undefined;
const couterCharacter = document.getElementById('characters-quantity') as HTMLSpanElement;

if(textarea) 
   couterCharacter.innerHTML = String(textarea.maxLength);

textarea?.addEventListener('keyup', (): void => {
   couterCharacter.innerHTML = `${textarea.maxLength - textarea.value.length}`;
   textarea.value = textarea.value.slice(0, textarea.maxLength);
})

buttonBack?.addEventListener('click', (): void => {
   window.history.back();
});

buttonNext?.addEventListener('click', (): void => {

   const radio = document.getElementsByName('radio') as NodeListOf<HTMLInputElement>;
   const checkbox = document.getElementsByName('checkbox') as NodeListOf<HTMLInputElement>;

   const select = document.getElementById('select-option') as HTMLSelectElement;

   if(textarea?.value.length !== 0) {
      navigation('submit');
   }

   let selectedRadioValue: null | string = null;
   let checkedValues: string[] = [];

   if (radio) {
      radio.forEach((item: HTMLInputElement) => {
         if (item.checked)
            localStorage.setItem('poll', JSON.stringify({ markets: item.value, status: select?.value }))
         navigation('poll2');
         return;
      });
   }

   if (checkbox) {
      checkbox.forEach((item: HTMLInputElement) => {
         if (item.checked)
            localStorage.setItem('poll2', JSON.stringify({ training_resourses: item.value, invest_status: select?.value }))
         navigation('details');
         return;
      });
   }
});

function submit() {
   console.log(JSON.parse(String(localStorage.getItem('poll'))));
}

function navigation(route: string): void {
   window.location.href = `${route}.html`;
}
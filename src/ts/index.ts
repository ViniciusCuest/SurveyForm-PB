const buttonSubmit = document.getElementById('submit') as HTMLButtonElement | undefined;
const buttonBack = document.getElementById('back')! as HTMLButtonElement | undefined;
const buttonNext = document.getElementById('next')! as HTMLButtonElement | undefined;

const textarea = document.getElementById('textarea') as HTMLTextAreaElement | undefined;
const couterCharacter = document.getElementById('characters-quantity') as HTMLSpanElement;

const full_name = document.getElementById('name') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const age = document.getElementById('age') as HTMLInputElement;


age?.addEventListener('keyup', (): void => {
   age.value = characterLimiter(age);
});

if (textarea)
   couterCharacter.innerHTML = String(textarea.maxLength);

textarea?.addEventListener('keyup', (): void => {
   couterCharacter.innerHTML = `${textarea.maxLength - textarea.value.length}`;
   textarea.value = characterLimiter(textarea);
});

buttonBack?.addEventListener('click', (): void => {
   window.history.back();
});

buttonNext?.addEventListener('click', (): void => {

   const radio = document.getElementsByName('radio') as NodeListOf<HTMLInputElement>;
   const checkbox = document.getElementsByName('checkbox') as NodeListOf<HTMLInputElement>;

   const select = document.getElementById('select-option') as HTMLSelectElement;

   if (textarea) {
      localStorage.setItem('details', String(textarea?.value));
      navigation('submit');
      return;
   }

   if (radio) {
      radio.forEach((item: HTMLInputElement): void => {
         if (item.checked) {
            localStorage.setItem('poll',
               JSON.stringify({
                  markets: item.value,
                  status: select?.value
               }))
            navigation('poll2');
            return;
         }
      });
   }

   if (checkbox.length) {
      let data: string[] = [];
      checkbox.forEach((item: HTMLInputElement): void => {
         if (item.checked)
            data.push(item.value);
      });
      localStorage.setItem('poll2',
         JSON.stringify({
            resourses: data,
            invest_status: select?.value
         }));
      navigation('details');
      return;
   }
});

buttonSubmit?.addEventListener('click', (): void => {

   let retrievedData: object = {
      full_name: String(full_name?.value),
      email: String(email?.value),
      age: String(age?.value),
      markets: JSON.parse(String(localStorage.getItem('poll')))?.markets,
      account_status: JSON.parse(String(localStorage.getItem('poll')))?.status,
      invest_status: JSON.parse(String(localStorage.getItem('poll2')))?.invest_status,
      resourses: JSON.parse(String(localStorage.getItem('poll2')))?.resourses,
      comment_detail: String(localStorage.getItem('details'))
   };

   localStorage.clear();
   console.log(retrievedData);
});


function navigation(route: string): void {
   window.location.href = `${route}.html`;
}

function characterLimiter(element: HTMLInputElement | HTMLTextAreaElement): string {
   return String(element.value.slice(0, element.maxLength));
}
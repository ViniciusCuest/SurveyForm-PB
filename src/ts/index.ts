type DataProps = {
   full_name: string;
   email: string;
   age: number;
   markets: string[];
   account_status: string;
   invest_status: string;
   resourses: string;
   comment_detail: string;
}

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

      if (!textarea.value.length) {
         textarea.classList.add('error');
         setTimeout((): void => {
            textarea.classList.remove('error');
         }, 500);
         return;
      }

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
         
      if (data.length)
         navigation('details');

      return;
   }
});

buttonSubmit?.addEventListener('click', (): void => {

   const modal = document.getElementById('success') as HTMLDivElement;
   const modalText = document.getElementById('sucess-text') as HTMLParagraphElement;

   if (!full_name.value) {
      full_name.classList.add('error');
      setTimeout((): void => {
         full_name.classList.remove('error');
      }, 1000);
   }

   if (!email.value) {
      email.classList.add('error');
      setTimeout((): void => {
         email.classList.remove('error');
      }, 1000);
   }

   if (!age.value) {
      age.classList.add('error');
      setTimeout((): void => {
         age.classList.remove('error');
      }, 1000);
   }

   if (!full_name.value || !email.value || !age.value)
      return;



   let retrievedData: DataProps = {
      full_name: String(full_name?.value),
      email: String(email?.value),
      age: Number(age?.value),
      markets: JSON.parse(String(localStorage.getItem('poll')))?.markets,
      account_status: JSON.parse(String(localStorage.getItem('poll')))?.status,
      invest_status: JSON.parse(String(localStorage.getItem('poll2')))?.invest_status,
      resourses: JSON.parse(String(localStorage.getItem('poll2')))?.resourses,
      comment_detail: String(localStorage.getItem('details'))
   };


   document.createElement(
      `<section id="success effect" class="success-modal">
         <p id="sucess-text">Be welcome, <b>${retrievedData.full_name.split(' ')[0]}!</></p>
      </section>`
   );

   //modalText.innerHTML = `Be welcome, <b>${retrievedData.full_name.split(' ')[0]}!</>`;
   //modal.classList.add('effect');

   localStorage.clear();

});


function navigation(route: string): void {
   window.location.href = `${route}.html`;
}

function characterLimiter(element: HTMLInputElement | HTMLTextAreaElement): string {
   return String(element.value.slice(0, element.maxLength));
}
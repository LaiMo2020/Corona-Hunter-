

var templateParams = {
   name: 'laith',
   email: 'Check this out!',
   value: "send"
};

let form = document.getElementById('contactForm');
let conf = document.getElementById('conf');

window.onload = () => {
   form.addEventListener('submit', (event) => {
      event.preventDefault();
      emailjs.send('gmail', 'laith', {
         "from_name": contactForm.name,
         "from_email": contactForm.emailaddress,
         "project_request": contactForm.projectsummary
      })
         .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            conf.style.opacity = 1;
         }, function (error) {
            console.log('FAILED...', error);
         });
   });
}
let form = document.getElementById("contactForm");
let conf = document.getElementById("conf");

function sendMail() {
  emailjs.sendForm('gmail', 'laith', '#contactForm')
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      conf.style.opacity = 1;
      document.getElementById("contactForm").reset();

    }, function (error) {
      console.log('FAILED...', error);
    });
  return false;
}

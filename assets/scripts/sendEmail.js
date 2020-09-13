let form = document.getElementById("contactForm");
let conf = document.getElementById("conf");



function sendMail(contactForm) {
  emailjs
    .send("gmail", "laith", {
      from_name: contactForm.name.value,
      to_name: contactForm.email.value,
      message: contactForm.send,
    })
    
    .then(
      function (response) {
        console.log("SUCCESS", response);
        conf.style.opacity = 1;
      },
      function (error) {
        console.log("FAILED", error);
      }
    );
  return false;
}


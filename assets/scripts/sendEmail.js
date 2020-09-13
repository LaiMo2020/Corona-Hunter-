


let form = document.getElementById('contactForm');
let conf = document.getElementById('conf');

window.onload = () => {
   form.addEventListener('submit', (event) => {
      event.preventDefault();
   
       
   });
}
function sendMail(contactForm) {
    emailjs.send("gmail", "laith", {
        "from_name": contactForm.name.value,
        "to_name": contactForm.email.value,
        "message": contactForm.send
       
        
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  
}


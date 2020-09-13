
var templateParams = {
    name: 'laith',
    email: 'Check this out!',
    value: "send"
};
 
emailjs.send('gmail', 'laith', {
        "from_name": contactForm.name,
        "from_email": contactForm.emailaddress,
        "project_request": contactForm.projectsummary
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
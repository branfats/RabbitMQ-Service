function createEmail(to, subject, text){
    return{
        to,
        from: {
            name :'Ecommerce Shop',
            email: 'diyanahj.2020@smu.edu.sg'
        },
        subject,
        text,
        html: `<p>${text}</p>`
    };
}

function sendEmail(to, subject, text){
    sendGridMail
    .send(createEmail(to,subject,text))
    .then((response) => console.log("Email sent..."))
    .catch((error) => console.log(error.message));
}


// Using above function for sending Email



// Template for checkout email



// Template for confirmation of delivery



// Template for ..

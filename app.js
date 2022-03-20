const sendGridMail = require('@sendgrid/mail')
const API_KEY = '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'

sendGridMail.setApiKey(API_KEY)

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

//sample call that works 
//sendEmail('diyanahjamal@gmail.com', 'test', 'test');

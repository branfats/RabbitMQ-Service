// sample from https://levelup.gitconnected.com/introduction-to-rabbitmq-with-nodejs-61e2aec0c52c

const amqp = require("amqplib");

async function connect() {

const msg = "THANK YOU FOR YOUR ORDER!
Hey ______,

This email contains the status of your recent order #202560593. At this time, we are starting to work on your order and are unable to cancel items or make changes.
ORDERS TYPICALLY SHIP WITHIN 1-3 BUSINESS DAYS
Once your order ships you will receive an email confirmation with your tracking information. It can take up to 24 hours for your tracking information to be updated by the carrier. Thank you for your patience and understanding.
Please note some items may ship separately due to availability, including any pre-order items.

Have a great day ahead!

ESD eCommerce Team"



 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue("checkout"{
   durable: true
   });
   await channel.sendToQueue("checkout", msg);
   console.log("Sending message to checkout queue");
   
   await channel.close();
   await connection.close();
 } catch (ex) {
   console.error(ex);
 }
}
connect();

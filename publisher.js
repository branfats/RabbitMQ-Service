//to run this use node publisher.js 

const amqp = require("amqplib");
async function connect() {
 const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
 try {
   //amqp connect -- create two way comms with RabbitMQ
   //currently running on local host
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();

   //create queue and send msg
   await channel.assertQueue("number");
   await channel.sendToQueue("number", msgBuffer);
   console.log("Sending message to number queue");

   //close what has been created 
   await channel.close();
   await connection.close();
 } catch (ex) {
   console.error(ex);
 }
}
connect();
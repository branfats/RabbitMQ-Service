const amqp = require("amqplib");
async function connect() {
 try {
   //amqp connect -- create two way comms with RabbitMQ
   //currently running on local host
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();

   await channel.assertQueue("number");

   //waiting to receive message from specifiedqueue
   channel.consume("number", message => {
     const input = JSON.parse(message.content.toString());
     console.log(`Received number: ${input.number}`);

     //tell mq that msg received 
     channel.ack(message);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
 }
}
connect();
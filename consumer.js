

const amqp = require("amqplib");

async function connect() {
 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue("checkout");
   channel.consume("checkout", message => {
     const input = JSON.parse(message.content);
     console.log(`Email template: {input}`);
     channel.ack(message);
   });
   console.log(`Waiting for message...`);
 } catch (ex) {
   console.error(ex);
 }
}
connect();

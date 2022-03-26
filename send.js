// Sample template from https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
// This tutorial assumes RabbitMQ is installed and running on localhost on the standard port(5672). In case you use a different host, port or credentials, connections settings would require adjusting.
// require amqp.node client libary to be installed

#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'checkout';
        
        var msg = 'THANK YOU FOR YOUR ORDER!
Hey ______,

This email contains the status of your recent order #202560593. At this time, we are starting to work on your order and are unable to cancel items or make changes.
ORDERS TYPICALLY SHIP WITHIN 1-3 BUSINESS DAYS
Once your order ships you will receive an email confirmation with your tracking information. It can take up to 24 hours for your tracking information to be updated by the carrier. Thank you for your patience and understanding.
Please note some items may ship separately due to availability, including any pre-order items.

Have a great day ahead!

ESD eCommerce Team';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});

const express = require('express');
const app = express();


app.use(express.json()) // -> req.body

var amqp = require('amqplib/callback_api');
// ROUTES 

//POST
app.post("/email/order/:userId/:orderId", async(req,res)=>{
    try {
        const {userId, orderId} = req.params
        const {name, email} = req.body
        let msg = `
        
        THANK YOU FOR YOUR ORDER!
       
        Hey put_name_here,
        
        This email contains the status of your recent order put_order_id_here. At this time, we are starting to work on your order and are unable to cancel items or make changes.
        ORDERS TYPICALLY SHIP WITHIN 1-3 BUSINESS DAYS
        Once your order ships you will receive an email confirmation with your tracking information. It can take up to 24 hours for your tracking information to be updated by the carrier. Thank you for your patience and understanding.
        Please note some items may ship separately due to availability, including any pre-order items.
        
        Have a great day ahead!
        
        ESD eCommerce Team`;

        msg = msg.replace('put_name_here', name);
        msg = msg.replace('put_order_id_here', "#"+orderId);

        let obj = {
            userId: userId,
            orderId: orderId,
            name:name,
            email:email,
            body:msg
        }

        sendToMq(obj);

        return res.json();
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

app.post("/email/sent/:userId/:orderId", async(req,res)=>{
    try {
        const {userId, orderId} = req.params
        const {name, email} = req.body
        let msg = `
        
        Hey put_name_here,

        We thought you'd like to know that all in stock items from your order put_order_id_here have shipped!

        Have a great day ahead!
        ESD eCommerce Team`;

        msg = msg.replace('put_name_here', name);
        msg = msg.replace('put_order_id_here', "#"+orderId);

        let obj = {
            userId: userId,
            orderId: orderId,
            name:name,
            email:email,
            body:msg
        }

        sendToMq(obj);

        return res.json();
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

app.post("/email/receive/:orderId", async(req,res)=>{
    try {
        const {userId, orderId} = req.params
        const {name, email} = req.body
        let msg = `
        Hey admin,

        We thought you'd like to know that 
        User: put_name_here 
        Order Id: put_order_id_here 
        has arrived to your customer!

        Have a great day ahead!`;

        msg = msg.replace('put_name_here', name);
        msg = msg.replace('put_order_id_here', "#"+orderId);

        let obj = {
            userId: userId,
            orderId: orderId,
            name:name,
            email:email,
            body:msg
        }

        sendToMq(obj);

        return res.json();
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

app.get('/', function(req, res) {
    res.send('Hello world!')
}); 

app.listen(3000, () => {
    console.log('Server Started');
});

function sendToMq(obj){
    amqp.connect(process.env.AMQP || "amqp://guest:guest@localhost:5672", function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'emailToSend';
            channel.assertQueue(queue, {
                durable: true
            });
      
            const msg = JSON.stringify(obj);
            console.log(msg);
            channel.sendToQueue(queue, Buffer.from(msg));
        });
      });
}

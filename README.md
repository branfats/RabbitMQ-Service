# RabbitMQ-Service



https://levelup.gitconnected.com/introduction-to-rabbitmq-with-nodejs-61e2aec0c52c

Make sure RabbitMQ is installed and running on localhost on the standard port (5672). If you are using a different host, port or credentials, connections settings would require adjusting.


How this works? <br>
Complex microservice sends information to RabbitMQ through this mircoservice <br>
Email microservice will be listening to the queue from RabbitMQ <br>
It sends the email with necessary information 

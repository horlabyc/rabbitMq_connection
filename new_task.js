const rabbitMq = require('amqplib/callback_api');

const connectionString = `amqp://kobo360:kobo360@34.245.14.151:5672`;
//connect to RabbitMq Server
rabbitMq.connect(connectionString, (error, connection) => {
  if(error){
    console.error(`RabbitMQ connection error: ${error}`);
    throw error;
  }
  connection.createChannel((error, channel) => {
    if(error) {
      throw error;
    }
    const queue = 'Mailbox';
    const message = process.argv.slice(2).join(' ') || "Hello World!.....";

    channel.assertQueue(queue, {
      durable: false
    });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("[x] Sent %s", message);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  })
})
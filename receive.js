const rabbitMq = require('amqplib/callback_api');

const connectionString = `amqp://kobo360:kobo360@34.245.14.151:5672`;

rabbitMq.connect(connectionString, (err, connection) => {
  if(err){
    console.error(`RabbitMQ connection error: ${err}`);
    throw err;
  }
  connection.createChannel((error, channel) => {
    if(error) {
      throw error;
    }
    const queue = 'Mailbox';
    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue,(msg) => {
      const formatted = JSON.parse(msg.content.toString())
      console.log(formatted)
      // console.log(" [x] Received %s", msg.content.toString());
    }, {
      noAck: true
    })
  })
})
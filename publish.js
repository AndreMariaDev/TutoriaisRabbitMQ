const amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost:5672',(error, conn)=>{
    conn.createChannel((err,ch)=>{
        var exchange = 'pub_sub_meetup28';
        var msg = process.argv.slice(2).join(' ') || 'Hello world!!!';

        ch.assertExchange(exchange, 'fanout', { durable: false});
        ch.publish(exchange, '', new Buffer.from(msg));
        console.log(`[x] Sent ${msg}`);      
    });

    setTimeout(()=> { conn.close(); process.exit(0)},500);
});
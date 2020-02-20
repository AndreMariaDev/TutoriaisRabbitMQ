const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', (error,conn) => {
    conn.createChannel((err,ch)=>{
        var exchange = "pub_sub_meetup28";

        ch.assertExchange(exchange,'fanout',{durable:false});

        ch.assertQueue('',{exclusive:true},(err,q)=>{
            console.log(`[*] Waiting for message in ${q.queue}. to exit press CTRL+C`);
            ch.bindQueue(q.queue, exchange,'');

            ch.consume(q.queue, (msgResult)=>{
                console.log(`[x] ${msgResult.content.toString()}`);
            }, { noAck: true});
        })
    })
});
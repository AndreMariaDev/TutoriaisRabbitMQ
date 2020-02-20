const amqp = require('amqplib/callback_api');

amqp.connect((error,cnn)=>{
    cnn.createChannel((err,ch)=>{
        ch.assertQueue('',{exclusive:true}, ( errCh, q)=> {
            const corr = uuid();
            console.log(`[x] Requesting user ${id}`);

            ch.sendToQueue('rcp_queue',new Buffer.from(id.toString()),{correlationId:corr, replyTo:q.queue});

            ch.consume(q.queue,(msgResult)=>{
                if(msgResult.properties.correlationId === corr) {
                    console.log(`[.] Got ${msgResult.content.toString()}`);
                    setTimeout(()=>{ cnn.close(); process.exit(0) },500);
                }
            }, { noAck: true});
        })
    })
});
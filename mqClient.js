var amqp = require('amqplib');

//连接mq
amqp.connect('amqp://172.16.0.65')
.then(function(conn){   //conn为mq连接
    //表示接受CTRL+C退出信号时，关闭和RabbitMQ的连接
    process.once('SIGINT',function(){
        conn.close();
    })
    //创建一个通道
    return conn.createChannel();
})
.then(function(ch){
    var q = 'hello';
    var msg = 'Hello World!';
    //在通道上监听hello队列，并设置durable持久化为false，表示队列保存在内存中
    var queue = ch.assertQueue('hello',{durable:false});
    queue.then(function(){
      ch.sendToQueue(q,new Buffer(msg));
      return ch.close();
    })
})

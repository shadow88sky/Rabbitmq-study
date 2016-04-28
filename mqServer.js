var amqp = require('amqplib');

//连接mq(最简单demo)
/*
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
    //在通道上监听hello队列，并设置durable持久化为false，表示队列保存在内存中
    var queue = ch.assertQueue('hello',{durable:false});
    queue.then(function(){
        //通道消费hello队列，并输出消息
        return ch.consume('hello',function(msg){
            console.log(msg.content.toString());
        },{noAck:true});
    })
})
*/

var ex = 'logs';
var ch = '';
amqp.connect('amqp://172.16.0.65')
.then(function(conn){   //conn为mq连接
    //表示接受CTRL+C退出信号时，关闭和RabbitMQ的连接
    process.once('SIGINT',function(){
        conn.close();
    })
    //创建一个通道
    return conn.createChannel();
})
.then(function(c){
    ch = c;
    //定义exchange
    return ch.assertExchange(ex,'fanout',{durable:false});
})
.then(function(){
    //定义queue
    return ch.assertQueue('',{exclusive:true});
})
.then(function(ok){
    var q = ok.queue;
    ch.bindQueue(q,ex,'');
    return ch.consume(q,function(msg){console.log(msg.content.toString())},{noAck:true})
})



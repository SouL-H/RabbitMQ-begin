const amqp= require("amqplib")
const message={
    description:"Test message"
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion= await channel.assertQueue("jobsQueue");

        //Message Get
        channel.consume('jobsQueue',(data)=>{
            console.log(data.content.toString())
            channel.ack(data);//Acknowledge the message
        })
  
    }catch(error){
        console.log(error)
    }
}
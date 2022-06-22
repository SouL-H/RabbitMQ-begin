const amqp= require("amqplib")
const message={
    description:"Test message"
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const assertion= await channel.assertQueue("jobsQueue")
        channel.sendToQueue("jobsQueue",Buffer.from(JSON.stringify(message)))
        console.log("Message sent: ",message)

    }catch(error){
        console.log(error)
    }
}
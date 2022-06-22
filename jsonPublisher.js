const amqb=require("amqplib");
const message={
    description:"Test message"
};

const data =require("./data.json")

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection= await amqb.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const assertion= await channel.assertQueue("jobsQueue");

        data.forEach(x => {
            message.description=x.id,
            channel.sendToQueue("jobsQueue",Buffer.from(JSON.stringify(message)));
            console.log("Message sent=>>",x.id);
        });
    }
    catch(e){
        console.log("error: ",e );
    }
}
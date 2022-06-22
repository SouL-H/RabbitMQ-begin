const amqp= require("amqplib")
const data = require("./data.json")

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion= await channel.assertQueue("jobsQueue");

        //Message Get
        channel.consume('jobsQueue',(getData)=>{
            const dataInfo=JSON.parse(getData.content.toString())
            const userInfo = data.find(u=>u.id==dataInfo.description)
            if(userInfo){
                console.log("Data found=>>",userInfo)
                channel.ack(getData);//Acknowledge the message
            }
           
        });
  
    }catch(error){
        console.log(error)
    }
}
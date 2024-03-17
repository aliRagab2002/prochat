
// var sendBtn=document.getElementById('SendBtn');
// var textbox=document.getElementById('textbox');
// var chatContainer=document.getElementById('chatContainer');




// var mongoclient=require('mongo').mongoclient;
// // Replace the connection string with your MongoDB connection string
// var mongoURL='mongodb://127.0.0.1:27017/donerRequest';






// var use={message:""};


// var arrayofpossiblemessage=[
//     {message:"hi",response:"hello"},
//     {message:"how are you?",response:"I'am good"},
//     {message:"what is your name?",response:"I'am chatbot"}
// ]


// function sendmessage(usermessage){
//     var messageElement= document.createElement('div');
//     messageElement.style.textAlign="right";
//     messageElement.style.margin="10px";


//     messageElement.innerHTML="<span> You </span>"+
//                             "<span>"+usermessage+"</span>"




//     setTimeout(()=>{
//         messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:1000})
//         chatContainer.appendChild(messageElement);
//         chatContainer.scrollTop=chatContainer.scrollHeight;




//     },1000)

    
// }

// async function chatbotResponse(usermessage){

//     var chatbotmessage="";
    
//      if(usermessage.length >5 ||usermessage=="h1"){
//         if (usermessage.length > 5 || usermessage == "h1") {
//             try {
//                 const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//                 const db = client.db('mongodb://127.0.0.1:27017/donerRequest');
//                 const collection = db.collection('a_doners');
    
//                 // Search for the response in the database
//                 const result = await collection.findOne({ message: { $regex: new RegExp(usermessage, 'i') } });
    
//                 if (result) {
//                     chatbotmessage = result.response;
//                 } else {
//                     chatbotmessage = "Please send another message";
//                 }
    
//                 client.close();}
//          catch (error) {
//             console.error('Error connecting to MongoDB:', error);
//             chatbotmessage = "Error connecting to the database";
//         }


//     }else{
//         chatbotmessage="please send a different message";
//     }




//     var messageElement=document.createElement('div');

//     messageElement.innerHTML="<span>Chatbot:</span>"+
//                                 "<span>" +chatbotmessage+"</span>";

//     chatContainer.appendChild(messageElement);
// }}





// sendBtn.addEventListener('click',function(e){

//    var usermessage= textbox.Value;
//     if(usermessage==""){
//         alert('please type in a message');
//     }else{
//        let usermessageText= usermessage.trim();
//        user.message=usermessageText;
//        textbox.Value="";
//        sendmessage(usermessageText);
//        chatbotResponse(usermessageText);
//     }
// })

var sendBtn = document.getElementById('SendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');

// var MongoClient = require('mongodb').MongoClient;
// var mongoURL = 'mongodb+srv://aliRagab:ragab134K@cluster0.9jjg2je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:5000/getData');
        const data = await response.json();

        console.log('Data from MongoDB:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
var user = { message: "" };

var arrayofpossiblemessage = [
    { message: "hi", response: "hello" },
    { message: "how are you?", response: "I'am good" },
    { message: "what is your name?", response: "I'am chatbot" }
];

function sendmessage(usermessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.margin = "10px";

    messageElement.innerHTML = "<span> You </span>" +
        "<span>" + usermessage + "</span>";

    setTimeout(() => {
        messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}

// async function chatbotResponse(usermessage) {
//     var chatbotmessage = "";

//     if (usermessage.length > 5 || usermessage == "h1") {
//         try {
//             const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
//             const db = client.db('donerRequest'); // Use correct database name here
//             const collection = db.collection('a_doners');

//             // Search for the response in the database
//             const result = await collection.findOne({ message: { $regex: new RegExp(usermessage, 'i') } });

//             if (result) {
//                 chatbotmessage = result.response;
//             } else {
//                 chatbotmessage = "Please send another message";
//             }

//             client.close();
//         } catch (error) {
//             console.error('Error connecting to MongoDB:', error);
//             chatbotmessage = "Error connecting to the database";
//         }

//     } else {
//         chatbotmessage = "please send a different message";
//     }

//     var messageElement = document.createElement('div');
//     messageElement.innerHTML = "<span>Chatbot:</span>" +
//         "<span>" + chatbotmessage + "</span>";

//     chatContainer.appendChild(messageElement);
// }

sendBtn.addEventListener('click', function (e) {
    var usermessage = textbox.value; // Use 'value' instead of 'Value'
    if (usermessage == "") {
        alert('please type in a message');
    } else {
        let usermessageText = usermessage.trim();
        user.message = usermessageText;
        textbox.value = ""; // Use 'value' instead of 'Value'
        sendmessage(usermessageText);
        // chatbotResponse(usermessageText);
    }
});

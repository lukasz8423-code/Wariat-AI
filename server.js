const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");


const app = express();


app.use(cors());
app.use(express.json());



const client = new OpenAI({

    apiKey: process.env.OPENAI_API_KEY

});



const PORT = 3001;





app.post("/ai", async (req,res)=>{


try{


const question = req.body.question;

const memory = req.body.memory || {};



if(!question){

return res.json({

answer:"Nie dostałem pytania."

});

}




const context = `

Użytkownik ma na imię:
${memory.name || "nieznane"}

Lubi:
${memory.likes ? memory.likes.join(", ") : "brak"}

Informacje:
${memory.facts ? memory.facts.join(", ") : "brak"}

`;





const response = await client.chat.completions.create({

model:"gpt-4.1-mini",


messages:[


{

role:"system",

content:
`Jesteś Wariat AI.
Rozmawiasz po polsku.
Pomagasz użytkownikowi Łukaszowi.
Masz być konkretny, naturalny i pomocny.
Nie udajesz człowieka.`

},


{

role:"user",

content:
context+
"\n\nPytanie:\n"+
question

}


],


temperature:0.7


});





res.json({

answer:
response.choices[0].message.content

});



}

catch(error){


console.log(error);



res.json({

answer:
"Nie mogę połączyć się z moim mózgiem AI: "+error.message

});



}



});






app.listen(PORT,()=>{


console.log(
"🤖 Wariat AI V14 działa na porcie "+PORT
);


});

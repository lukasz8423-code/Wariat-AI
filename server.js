const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;


// ===============================
// WARIAT AI - ZEWNĘTRZNY MÓZG
// ===============================


app.post("/ai", async (req, res) => {

    try {

        const question = req.body.question;
        const memory = req.body.memory || {};


        if (!question) {

            return res.json({
                answer: "Nie dostałem pytania."
            });

        }



        const userMemory = `
Imię użytkownika:
${memory.name || "brak"}

Lubi:
${memory.likes ? memory.likes.join(", ") : "brak"}

Informacje:
${memory.facts ? memory.facts.join(", ") : "brak"}
`;



        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Authorization":
                    "Bearer " + process.env.OPENROUTER_KEY,

                    "Content-Type":
                    "application/json",

                    "HTTP-Referer":
                    "http://localhost:3000",

                    "X-Title":
                    "Wariat AI"

                },


                body: JSON.stringify({

                    model:
                    "meta-llama/llama-3.1-8b-instruct:free",


                    messages: [

                        {

                            role: "system",

                            content:
                            "Jesteś Wariat AI. Odpowiadasz po polsku. Pomagasz Łukaszowi. Masz być konkretny, pomocny i naturalny."

                        },


                        {

                            role: "user",

                            content:
                            userMemory +
                            "\n\nPytanie:\n" +
                            question

                        }

                    ]

                })

            }
        );



        const data = await response.json();



        if (data.error) {

            return res.json({

                answer:
                "Błąd AI: " + data.error.message

            });

        }



        const answer =
        data.choices[0].message.content;



        res.json({

            answer: answer

        });



    } catch(error) {


        console.log(error);


        res.json({

            answer:
            "Nie mogę połączyć się z moim mózgiem AI."

        });


    }


});





app.listen(PORT, () => {

    console.log(
        "🤖 Wariat AI Brain działa na porcie " + PORT
    );

});

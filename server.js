const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Wariat AI serwer działa 🤖");
});


app.get("/szukaj", async (req,res)=>{

    const pytanie = req.query.q;

    if(!pytanie){
        return res.json({
            error:"Brak pytania"
        });
    }


    res.json({

        odpowiedz:
        "Szukam informacji o: " + pytanie,

        zdjecia:[
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Heracleum_mantegazzianum.jpg/640px-Heracleum_mantegazzianum.jpg"
        ]

    });


});


app.listen(3000,()=>{

console.log(
"Wariat AI server działa na porcie 3000"
);

});

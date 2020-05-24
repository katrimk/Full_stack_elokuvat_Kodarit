const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("kuuntelen porttia " + port));
app.use(express.static("public")); 

app.use(express.json({limit: '1mb'}));

const arvostelut = [
    {
        "leffa": "Titanic",
        "arvostelu": "Klassikkokamaa",
        "arvostelija": "Suvi"
    },
    {
        "leffa": "Star Wars",
        "arvostelu": "Silmäkarkkia",
        "arvostelija": "Juno"
    }
] 

app.get('/api/arvostelut', function (request, response) {
    response.send(arvostelut);
})

app.post('/api/arvostele', function (request, response) {
    arvostelut.push(request.body);
    console.log(arvostelut);
    response.send(200);
})
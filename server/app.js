import express from "express";
import { connect } from "./mongoose/index.js";
import routes from "./routes/index.js";
import cors from 'cors';

const PORT = 8000; // port sur lequel je vais écouter

const app = express(); // j'initialise / j'instancie mon serveur
app.use(express.json()); // je suis sur que ca va me retourné un json
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

connect(); // je me connecte à la base de données

// app.use('/api, routes) veut dire que toutes les
// routes définies dans routes/index.js seront
// préfixées par /api
app.use('/api', routes);

// Gérer la page 404 de notre petit serveur
app.get('*', (request, response) => {
    response.status(404).json({
        message: "Not found"
    });
})

app.listen(PORT, () => { // On écoute sur le serveur sur le port {PORT}
    // on mets tout ce qu'on veut lorsque le serveur est lancé
    console.log(`Server is running on port ${PORT}`);
    console.log(`Adress: http://localhost:${PORT}`)
});
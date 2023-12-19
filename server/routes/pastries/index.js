import express from "express";
import { Pastrie } from "../../models/Pastrie.js";
import { MOCK_PASTRIES } from "../../mock/pastries.js";

const pastries = express();

// localhost:8000/api/pastries
pastries.get('/', (request, response) => {
    // on va chopper toutes les pastries ici (en fonction du start et la limit)
    const start = parseInt(request.query.start) || 0;
    const limit = parseInt(request.query.limit) || 10;

    Pastrie.find({}).limit(limit).skip(start).then(pastries => {
        response.status(200).json(pastries);
    }).catch(err => {
        response.status(400).json(err);
    })
});

// localhost:8000/api/pastries/seed
pastries.get('/seed', (request, response) => {
    Pastrie.insertMany(MOCK_PASTRIES).then(pastries => 
        response.status(200).json({data: pastries, message: 'OK!'})
    ).catch(err => {
        response.status(400).json(err);
    });
});

// localhost:8000/api/pastries/clear
pastries.get('/clear', (request, response) => {
    Pastrie.deleteMany({}).then(() => 
        response.status(200).json({message: 'OK!'})
    ).catch(err => {
        response.status(400).json(err);
    });
})

// localhost:8000/api/pastries/:id
pastries.get('/:id', (request, response) => {
    // destructuring de l'id dans les paramètres de l'url
    const { id } = request.params;

    Pastrie.findById(id).then(pastrie => {
        if (!pastrie) // s'il n'y a pas de pastrie avec cet id => 404
            return response.status(404).json({message: 'Not found'});
        response.status(200).json(pastrie);
    }).catch(err => {
        response.status(400).json(err);
    })
});

export default pastries
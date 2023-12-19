import express, { request } from "express";
import { INGREDIENTS_LISTS } from "../../mock/ingredients.js";
import { Ingredient } from "../../models/Ingredient.js";
import { checkToken } from "../../middlewares/index.js";

const ingredients = express();

// localhost:8000/api/ingredients
ingredients.get('/', (request, response) => {
    // on va chopper toutes les ingredients ici
    Ingredient.find({}).then(ingredients => {
        response.status(200).json(ingredients);
    }).catch(err => {
        response.status(400).json(err);
    })
});

// localhost:8000/api/ingredients/seed
ingredients.get('/seed', (request, response) => {
    Ingredient.insertMany(INGREDIENTS_LISTS).then(ingredients => 
        response.status(200).json({data: ingredients, message: 'OK!'})
    ).catch(err => {
        response.status(400).json(err);
    });
});

// localhost:8000/api/ingredients/clear
ingredients.get('/clear', (request, response) => {
    Ingredient.deleteMany({}).then(() => 
        response.status(200).json({message: 'OK!'})
    ).catch(err => {
        response.status(400).json(err);
    });
})

// localhost:8000/api/ingredients/pastrie/:id
ingredients.get('/pastrie/:id', (request, response) => {
    const { id } = request.params;

    Ingredient.findOne({ pastryId: id }).then(ingredients => {
        response.status(200).json(ingredients);
    }).catch(err => {
        response.status(400).json(err);
    })
})

// localhost:8000/api/ingredients/protected
ingredients.get('/protected', checkToken, (request, response) => {
    response.status(200).json({message: 'OK!'});
});

// localhost:8000/api/ingredients/:id
ingredients.get('/:id', (request, response) => {
    // destructuring de l'id dans les paramètres de l'url
    const { id } = request.params;

    Ingredient.findById(id).then(pastrie => {
        if (!pastrie) // s'il n'y a pas de pastrie avec cet id => 404
            return response.status(404).json({message: 'Not found'});
        response.status(200).json(pastrie);
    }).catch(err => {
        response.status(400).json(err);
    })
});

export default ingredients
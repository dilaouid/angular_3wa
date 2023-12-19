import express from 'express';
import pastries from './pastries/index.js';
import ingredients from './ingredients/index.js';

// localhost:8000/api
const routes = express();

// localhost:8000/api/pastries
routes.use('/pastries', pastries);

// localhost:8000/api/ingredients
routes.use('/ingredients', ingredients);

export default routes;
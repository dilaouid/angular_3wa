import express from 'express';
import pastries from './pastries/index.js';
import ingredients from './ingredients/index.js';

// localhost:8000/api
const routes = express();

routes.use('/pastries', pastries);
routes.use('/ingredients', ingredients);

export default routes;
import express from 'express';
import pastries from './pastries/index.js';
import ingredients from './ingredients/index.js';
import auth from './auth/index.js';

// localhost:8000/api
const routes = express();

// localhost:8000/api/pastries
routes.use('/pastries', pastries);

// localhost:8000/api/ingredients
routes.use('/ingredients', ingredients);

// localhost:8000/api/auth
routes.use('/auth', auth);

export default routes;
import express from 'express';
import pastries from './pastries/index.js';

// localhost:8000/api
const routes = express();

routes.use('/pastries', pastries);

export default routes;
import { Router } from 'express';
import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

// Query params = req.query (filters, order, pages)
// Route params = req.params (identify a feature on change or removal)
// Body = req.body (data for creating or changing a record)

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

export default routes;

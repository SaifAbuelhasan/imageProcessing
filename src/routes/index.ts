import express from 'express';
const routes = express.Router();
import image from './api/image';

/**
 * main API Route
 */
routes.get('/', (req, res) => {
	res.send('main api route!');
});

// use api/image for image routes
routes.use('/images', image);

export default routes;

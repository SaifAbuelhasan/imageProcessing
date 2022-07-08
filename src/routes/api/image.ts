import express from 'express';
const image = express();

/**
 * image API Route
 */
image.get('/', (req, res) => {
	res.send('image api route!');
});

export default image;

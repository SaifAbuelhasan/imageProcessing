import express from 'express';
const app = express();
import routes from './routes/index';
const port = process.env.PORT || 3000;

// use routes api
app.use('/api', routes);

// run server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;

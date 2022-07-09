import index from '../index';
import request from 'supertest';

// test image routes
describe('Test endpoint response', () => {
	it('gets the api/images endpoint', async () => {
		const res = await request(index).get('/api/images');
		expect(res.status).toBe(400);
	});
});

describe('Test image resize', () => {
	it('resizes an image successfully', async () => {
		const res = await request(index).get(
			'/api/images?filename=fjord&width=100&height=100'
		);
		expect(res.status).toBe(200);
	});

	it('fails to resize non-existent image', async () => {
		const res = await request(index).get(
			'/api/images?filename=test&width=100&height=100'
		);
		expect(res.status).toBe(400);
	});

	it('invalid width or height', async () => {
		const res = await request(index).get(
			'/api/images?filename=fjord&width=100&height=test'
		);
		expect(res.status).toBe(400);
	});
});

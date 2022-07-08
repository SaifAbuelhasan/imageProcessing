import index from '../index';
import request from 'supertest';

// test image routes
describe('image routes tests', () => {
	it('should return a 200 response', async () => {
		const res = await request(index).get('/api/images');
		expect(res.status).toBe(200);
	});
});

// it('should get basic data on the country canada', async () => {
// 	const data = await countries.getCountry('canada');
// 	expect(data).toEqual({
// 		capital: 'Ottawa',
// 		region: 'Americas',
// 		numericCode: '124'
// 	});
// });

// /** Add test for getRegionCountries function here */

// it('should get capitals of NAFTA countries', async () => {
// 	const data = await countries.getRegionCapitals('nafta');
// 	expect(data).toEqual(['Ottawa', 'Mexico City', 'Washington, D.C.']);
// });

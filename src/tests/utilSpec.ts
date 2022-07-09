import {
	fullImageExists,
	invalidWidthOrHeight,
	resizeImage
} from '../utilities/imageUtils';

// utils tests
describe('imageUtils', () => {
	it('checks for full image', () => {
		expect(fullImageExists('test')).toBe(false);
		expect(fullImageExists('fjord')).toBe(true);
	});

	it('checks for invalid width or height', () => {
		expect(invalidWidthOrHeight(100, 100)).toBe(false);
		expect(invalidWidthOrHeight(100, +'test')).toBe(true);
		expect(invalidWidthOrHeight(+'test', 100)).toBe(true);
	});

	it('resizes an image successfully', async () => {
		const res = await resizeImage('fjord', 100, 100);
		expect(res.length).toBeGreaterThan(0);
	});
});

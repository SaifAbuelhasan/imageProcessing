import sharp from 'sharp';
import fs from 'fs';

/**
 * Check that full image exists
 * @param {string} filename - image filename
 * @returns {boolean} - true if image exists
 */
const fullImageExists = (filename: string): boolean => {
	return fs.existsSync(`${process.cwd()}/assets/full/${filename}.jpg`);
};

/**
 * Check for invalid or string width or height
 * @param {number} width - width of image
 * @param {number} height - height of image
 * @returns {boolean} - true if invalid
 */
const invalidWidthOrHeight = (width: number, height: number): boolean => {
	return isNaN(width) || isNaN(height) || width <= 0 || height <= 0;
};

/**
 * Check if thumb image exists
 * @param {string} filename - image filename
 * @param {number} width - width of image
 * @param {number} height - height of image
 * @returns {boolean} - true if image exists
 */
const thumbExists = (
	filename: string,
	width: number,
	height: number
): boolean => {
	return fs.existsSync(
		`${process.cwd()}/assets/thumb/${filename}_${width}x${height}.jpg`
	);
};

/**
 * Resize image to width x height
 * @param {string} filename - image filename
 * @param {number} width - width of image
 * @param {number} height - height of image
 * @returns {Promise<string>} - image data
 */
const resizeImage = async (
	filename: string,
	width: number,
	height: number
): Promise<string> => {
	const imagePath = `${process.cwd()}/assets/full/${filename}.jpg`;
	const thumbPath = `${process.cwd()}/assets/thumb/${filename}_${width}x${height}.jpg`;
	console.log(`resizing ${imagePath} to ${thumbPath}`);
	// if thumb image doesn't exist, resize image
	if (!thumbExists(filename, width, height)) {
		console.log(`resizing image ${filename}`);
		// resize image
		await sharp(imagePath).resize(width, height).toFile(thumbPath);
	}

	// throw input file missing error if filename is empty
	if (filename === '') {
		throw new Error('input file missing');
	}

	// return image path
	return thumbPath;
};

export { fullImageExists, invalidWidthOrHeight, resizeImage };

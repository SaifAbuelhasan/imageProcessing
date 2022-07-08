import express from 'express';
import sharp from 'sharp';
const image = express();

const fullImagesPath = process.cwd() + '/assets/full';
const thumbImagesPath = process.cwd() + '/assets/thumb';

// variable to store current image data
type ImageData = {
	filename: string;
	width: number;
	height: number;
};

let currentImage: ImageData = {
	filename: '',
	width: 0,
	height: 0
};

/**
 * resize image to fit in a box of size width x height
 * @param {string} filename - image filename
 * @param {number} width - width of box
 * @param {number} height - height of box
 * @returns {ImageData} - image data
 */
const resizeImage = async (
	filename: string,
	width: number,
	height: number
): Promise<ImageData> => {
	const imagePath = `${fullImagesPath}/${filename}.jpg`;
	const thumbPath = `${thumbImagesPath}/${filename}_thumb.jpg`;

	// if data is different from current image, resize image
	if (
		currentImage.filename !== filename ||
		currentImage.width !== width ||
		currentImage.height !== height
	) {
		console.log(`resizing image ${filename}`);
		// resize image
		await sharp(imagePath).resize(width, height).toFile(thumbPath);
	}

	// throw input file missing error if filename is empty
	if (filename === '') {
		throw new Error('input file missing');
	}

	// return image data
	return { filename, width, height };
};

// @route   GET api/images?filename=:filename&width=:width&height=:height
image.get('/', async (req, res) => {
	const {
		filename,
		width,
		height
	}: { filename?: string; width?: string; height?: string } = req.query;

	// set filename to empty string if not provided
	const filename_ = filename === undefined ? '' : filename;

	// set width and height to 0 if not provided
	const width_ = width ? +width : 0;
	const height_ = height ? +height : 0;
	// try to resize image and catch error if it fails
	try {
		currentImage = await resizeImage(filename_, width_, height_);
		const thumbPath = `${thumbImagesPath}/${filename_}_thumb.jpg`;
		// respond with image
		res.sendFile(thumbPath);
	} catch (err) {
		if (err instanceof Error) res.status(400).send(err.message);
	}

	// await resizeImage(filename, w, h);
	// res.status(200).send('image resized');
});

export default image;

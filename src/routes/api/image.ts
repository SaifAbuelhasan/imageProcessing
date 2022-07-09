import express from 'express';
import {
	fullImageExists,
	invalidWidthOrHeight,
	resizeImage
} from '../../utilities/imageUtils';
const image = express();

// @route   GET api/images?filename=:filename&width=:width&height=:height
image.get('/', async (req, res) => {
	const {
		filename,
		width,
		height
	}: { filename?: string; width?: string; height?: string } = req.query;

	// set filename to empty string if not provided
	const filename_ = filename === undefined ? '' : filename;

	// set width and height to 0 if not provided or string
	const width_ = width ? +width : 0;
	const height_ = height ? +height : 0;

	// respond with error if filename doesn't exist
	if (!fullImageExists(filename_)) {
		res.status(400).send('image not found');
		return;
	}

	// respond with error if width or height is invalid
	if (invalidWidthOrHeight(width_, height_)) {
		res.status(400).send('invalid width or height');
		return;
	}

	// try to resize image and catch error if it fails
	try {
		const thumbPath = await resizeImage(filename_, width_, height_);
		console.log(thumbPath);
		// respond with image
		res.status(200).sendFile(thumbPath);
	} catch (err) {
		if (err instanceof Error) res.status(400).send(err.message);
	}
});

export default image;

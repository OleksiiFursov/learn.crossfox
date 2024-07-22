const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/image/:size/:image', (req, res) => {
	const {size, image} = req.params;
	const imagePath = path.resolve(__dirname, 'images', image);

	fs.access(imagePath, fs.constants.F_OK | fs.constants.R_OK, err => {
		if(err) {
			return res.status(404).json({message: "Image not found"});
		} else {
			const transform = sharp().resize({
				width: parseInt(size),
				fit: 'cover',
				position: 'right top'
			});

			res.set('Content-Type', 'image/jpg');

			const readStream = fs.createReadStream(imagePath);
			readStream.pipe(transform).pipe(res);
		}
	})
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, './client/build'));
	},
	filename: function(req, file, cb) {
		let nameGenerator = function () {
			return '_' + Math.random().toString(36).substr(2, 9);
		  };
		let index = nameGenerator();
		req.filename = index;
		const imgName = index;
		cb(null, imgName + '.jpg');
	}, 
}); 

const upload = multer({
	storage: storage
});

module.exports = upload;
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/uploads'); // Specify the destination folder where uploaded files will be stored
//   },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});



// Init upload
const upload = multer({
  storage: storage

}) 

export default upload;
;const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
            let name = path.extname(file.originalname);
            if(name !== ".jpg" && name !== ".png" && name !== ".jpeg" && name !== ".pdf"){
                cb(new error("file type not supported"), false);
                return;
            }
            cb(null, true);
    }
})

module.exports = upload
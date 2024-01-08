const crypto = require('crypto');
const multer = require('multer');
const { extname, resolve } = require('path');

module.exports = {
  upload(folder) {
    return {
      storage: multer.diskStorage({
        destination: (request, file, callback) => {
          callback(null, resolve(process.cwd(), folder));
        },
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};

const multer = require('multer');

// === ini untuk kofigurasi, filenya disimpen didalam foler apa dan namanya apa === //
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g,""))
    }
});

// === ini untuk inisialisasi dari multernyan untuk menyimpan konfigurasi yang sudah dibuat diatas === //
const upload = multer({
    storage: store
});

module.exports = upload;
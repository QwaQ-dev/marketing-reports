const Router = require("express");
const multer = require("multer");
const router = new Router();

const FormController = require('../controllers/formController');
const PartnersController = require('../controllers/partnersController');

const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/"); 
  },
  filename: function (req, file, cb) {
    const originalName = Buffer.from(file.originalname).toString('utf8');
    cb(null, originalName); 
  },
});

const upload = multer({ storage: tempStorage });

router.post("/partners-tenants", PartnersController.getMatchingPartners);
router.post("/upload", upload.array("files", 10), FormController.uploadForm); 


module.exports = router;
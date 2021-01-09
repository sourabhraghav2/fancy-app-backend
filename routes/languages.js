var express = require('express');
var router = express.Router();
var languagesCntrl = require("../controllers/languagesController");
var authorization = require("../controllers/auth");
router.post("/getAll",[ authorization,languagesCntrl.findAllLanguages]);
router.post("/create",languagesCntrl.create);
router.get("/getLanguage/:language", languagesCntrl.findLanguage);
module.exports = router;

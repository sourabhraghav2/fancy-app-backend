var express = require('express');
var router = express.Router();
var userCntrl = require("../controllers/userController");
var authorization = require("../controllers/auth");
router.get("/getAll",[ authorization, userCntrl.findAllUsers]);
router.get("/getUser/:name",[ authorization, userCntrl.findUser]);


router.get("/delete/:username",[ authorization, userCntrl.deleteUser]);
router.post("/create",  userCntrl.create);
router.post("/update", [ authorization, userCntrl.update]);
router.post("/login", userCntrl.login);
module.exports = router;

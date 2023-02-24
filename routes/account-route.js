const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities/index")
const accountController = require("../controllers/accountController");

router.get("/login", accountController.buildLogin);
router.get("/register", accountController.buildRegister);
router.post("/register", accountController.registerClient);

module.exports = router;
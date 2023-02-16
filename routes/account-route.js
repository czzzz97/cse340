const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities/index")
const accountController = require("../controllers/accountController");

router.get("/clients", accountController.buildLogin);

module.exports = router;

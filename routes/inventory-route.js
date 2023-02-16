const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildByInvId);
router.get("/management", invController.buildManagement);

module.exports = router;

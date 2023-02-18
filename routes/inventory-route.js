const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildByInvId);
router.get("/management", invController.buildManagement);
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.addClassification)


module.exports = router;

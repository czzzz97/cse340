const invValidate = require('../utilities/inv-validation')
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildByInvId);
router.get("/", invController.buildManagement);
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", 
        invValidate.classificationRules(),
        invValidate.checkClassifData,
        invController.addClassification)
router.get("/add-vehicle", invController.buildAddVehicle)
router.post("/add-vehicle",
        invValidate.vehicleRules(),
        invValidate.checkVehicleData,
        invController.addVehicle)

module.exports = router;

const invModel = require("../models/inventory-model")
const utilities = require("./")
const { body, validationResult } = require("express-validator")
const validate = {}

validate.classificationRules = () => {
    return [
      body("classification_name")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name."), // on error this message is sent.
    ]
  }

  validate.checkClassifData = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("../views/clients/add-classification", {
            errors,
            message: null,
            title: "Add Classification",
            nav,
        })
        return
    }
    next()
  }

  validate.vehicleRules = () => {
    return [
      body("inv_make")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please provide the make."),
  
        body("inv_model")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please provide the model."),

        body("inv_year")
        .trim()
        .escape()
        .isLength({ min: 4, max: 4 })
        .isNumeric({no_symbols: true})
        .withMessage("Please provide the year."),

        body("inv_description")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please provide a short description."),

        body("inv_image")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the image path (or leave default)."),

        body("inv_thumbnail")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide the thumb path (or leave default)."),

        body("inv_price")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .isDecimal({decimal_digits: 2})
        .withMessage("Please provide the price."),

        body("inv_miles")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .isNumeric({no_symbols: true})
        .withMessage("Please provide the mileage."),

        body("inv_color")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please provide the color."),
    ]
  }

  validate.checkVehicleData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let data = await invModel.getClassifications()
        res.render("../views/inventory/add-vehicle", {
            errors,
            message: null,
            title: "Add Vehicle",
            nav,
            data,
            inv_make, 
            inv_model,
            inv_year,
            inv_description, 
            inv_image, 
            inv_thumbnail, 
            inv_price, 
            inv_miles, 
            inv_color,
            classification_id
        })
        return
    }
    next()
  }

  module.exports = validate;
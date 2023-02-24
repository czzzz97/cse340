const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    let className = 'No'
    try {
      className = data[0].classification_name
    } catch (error) {
      message = error
    }
    res.render("./inventory/classification-view", {
        title: className + " vehicles",
        nav,
        message: null,
        data,
    })
}

invCont.buildByInvId = async function (req, res, next) {
    const invId = req.params.invId
    let row = await invModel.getDetailsByInvId(invId)
    data = row[0]
    let nav = await utilities.getNav()
    let details = await utilities.getDetails(data)
    const vMake = data.inv_make
    const vModel = data.inv_model
    res.render("./inventory/vehicle-detail", {
        title: vMake + " " + vModel,
        nav,
        details,
        message: null,
    })
}

invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management-view", {
        title: "Inventory Management",
        nav,
        message: null,
    })
}

invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification.ejs", {
        title: "Add Classification",
        nav,
        message: null,
    })
} 

invCont.addClassification = async function (req, res) {
    const { classification_name } =
      req.body
  
    const addResult = await invModel.addClassification(
        classification_name
    )
    let nav = await utilities.getNav() //moved nav here so hopefully it loads with the new class
    console.log(addResult)
    if (addResult) {
      res.status(201).render("./inventory/management-view.ejs", {
        title: "Inventory Management",
        nav,
        message: `${classification_name} added successfully.`,
        errors: null,
      })
    } else {
      const message = "Classification could not be added."
      res.status(501).render("./inventory/add-classification.ejs", {
        title: "Add Classification",
        nav,
        message,
        errors: null,
      })
    }
  }

  invCont.buildAddVehicle = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-vehicle.ejs", {
        title: "Add Vehicle",
        nav,
        message: null,
    })
} 

invCont.addVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  //ADD CLASSIFICATION
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } =
    req.body

  const regResult = await invModel.addVehicle(
    inv_make, 
    inv_model,
    inv_year,
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("./inv/management-view.ejs", {
      title: "Inventory Management",
      nav,
      message: `${inv_make} ${inv_model} added successfully.`,
      errors: null,
    })
  } else {
    const message = "Vehicle could not be added."
    res.status(501).render("./inv/add-vehicle.ejs", {
      title: "Add Vehicle",
      nav,
      message,
      errors: null,
    })
  }
}

module.exports = invCont;
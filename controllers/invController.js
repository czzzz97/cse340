const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId(classificationId)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
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
      const message = "Classification failed to be added."
      res.status(501).render("./inventory/add-classification.ejs", {
        title: "Add Classification",
        nav,
        message,
        errors: null,
      })
    }
  }

module.exports = invCont;
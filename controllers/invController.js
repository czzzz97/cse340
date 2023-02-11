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
        data,
    })
}

module.exports = invCont;
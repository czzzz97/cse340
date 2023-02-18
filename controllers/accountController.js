utilities = require("../utilities/index")

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/login-view", {
        title: "Login",
        nav,
        message: null,
    })
}

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/registration-view", {
        title: "Register",
        nav,
        message: null,
    })
}

module.exports = { buildLogin, buildRegister }
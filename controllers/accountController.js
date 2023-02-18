utilities = require("../utilities/index")
accountModel = require("../models/account-model")

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./clients/login-view", {
        title: "Login",
        nav,
        message: null,
    })
}

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./clients/registration-view", {
        title: "Register",
        nav,
        message: null,
    })
}

async function registerClient(req, res) {
    let nav = await utilities.getNav()
    const { client_firstname, client_lastname, client_email, client_password } =
      req.body
  
    const regResult = await accountModel.registerClient(
      client_firstname,
      client_lastname,
      client_email,
      client_password
    )
    console.log(regResult)
    if (regResult) {
      res.status(201).render("clients/login.ejs", {
        title: "Login",
        nav,
        message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
        errors: null,
      })
    } else {
      const message = "Sorry, the registration failed."
      res.status(501).render("clients/register.ejs", {
        title: "Registration",
        nav,
        message,
        errors: null,
      })
    }
  }

module.exports = { buildLogin, buildRegister, registerClient }
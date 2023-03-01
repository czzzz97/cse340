utilities = require("../utilities/index")
accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")


async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./clients/login-view", {
        title: "Login",
        nav,
        message: null,
        errors: null,
    })
}

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./clients/registration-view", {
        title: "Register",
        nav,
        message: null,
        errors: null,
    })
}

async function registerClient(req, res) {
    let nav = await utilities.getNav()
    const { client_firstname, client_lastname, client_email, client_password } =
      req.body

      let hashedPassword
      try {
        // pass regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(client_password, 10)
      } catch (error) {
        res.status(500).render("clients/register", {
          title: "Registration",
          nav,
          message: 'Sorry, there was an error processing the registration.',
          errors: null,
        })
      }

    const regResult = await accountModel.registerClient(
      client_firstname,
      client_lastname,
      client_email,
      hashedPassword
    )


    
    console.log(regResult)
    if (regResult) {
      res.status(201).render("./clients/login-view.ejs", {
        title: "Login",
        nav,
        message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
        errors: null,
      })
    } else {
      const message = "Sorry, the registration failed."
      res.status(501).render("./clients/registration-view.ejs", {
        title: "Registration",
        nav,
        message,
        errors: null,
      })
    }
  }

module.exports = { buildLogin, buildRegister, registerClient }
const regValidate = require('../utilities/account-validation')
const express = require("express"); 
const router = new express.Router(); 
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/")

router.get("/login", accountController.buildLogin);
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  accountController.loginClient
)

router.get("/register", accountController.buildRegister);
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    accountController.registerClient
  )

//router.get("/", utilities.checkJWTToken, accountController.buildManagement)
router.get("/", utilities.checkJWTToken, accountController.accountLogin)

//router.get("/account", accountController.buildAccount);

module.exports = router;

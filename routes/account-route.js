const regValidate = require('../utilities/account-validation')
const express = require("express"); 
const router = new express.Router(); 
const accountController = require("../controllers/accountController");

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

module.exports = router;

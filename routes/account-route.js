const regValidate = require('../utilities/account-validation')
const express = require("express"); 
const router = new express.Router(); 
const accountController = require("../controllers/accountController");

router.get("/login", accountController.buildLogin);
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

router.get("/register", accountController.buildRegister);
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    accountController.registerClient
  )

module.exports = router;

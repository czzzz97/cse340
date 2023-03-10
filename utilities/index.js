const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

Util.buildNav = function (data) {
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    nav = Util.buildNav(data)
    return nav
}

Util.buildDetails = function (data) {
    let list = ""
    list += '<div class="details"><div><h2>' + data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model + '</h2>'
    list += '<img src="' + data.inv_image + '" alt="Full-size image of car"/></div>'
    list += '<div><h2>Vehicle Details</h2><p>' + data.inv_description + '</p>'
    list += '<p>Price: $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</p>'
    list += '<p>Color:' + data.inv_color + '</p>'
    list += '<p>Miles: ' + new Intl.NumberFormat('en-US').format(data.inv_miles) + '</p></div></div>'
    return list
}

Util.getDetails = function (data) {
    details = Util.buildDetails(data)
    return details
}

Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, clientData) {
        if (err) {
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
      res.locals.clientData = clientData
      res.locals.loggedin = 1
      next()
      })
  } else {
    next()
  }
}

/*Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    return res.redirect("/account/login")
  }
 }*/

module.exports = Util
const invModel = require("../models/inventory-model")
const Util = {}

Util.buildNav = function (data) {
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '"title="See our inventory of ' +
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
    list += '<div class="details"><div><h2>' + data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model + '</h1>'
    list += '<img src="' + data.inv_image + '" alt="Full-size image of car"/></div>'
    list += '<div><h2>Vehicle Details</h2><p>' + data.inv_description + '</p>'
    list += '<p>Price: $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</p>'
    list += '<p>Color:' + data.inv_color + '</p>'
    list += '<p>Miles: ' + new Intl.NumberFormat('en-US').format(data.inv_miles) + '</p></div></div>'
    return list
}//<span>$<%=  new Intl.NumberFormat('en-US').format(vehicle.inv_price) %></span>

Util.getDetails = function (data) {
    details = Util.buildDetails(data)
    return details
}

module.exports = Util
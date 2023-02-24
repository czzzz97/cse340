const pool = require("../database/")

async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getVehiclesByClassificationId(classificationId){
    try {
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
        [classificationId])
        return data.rows
    } catch (error) {
        console.error('getclassificationsbyid error' + error)
    }
}

async function getDetailsByInvId(invId){
    try {
        const data = await pool.query("SELECT * FROM public.inventory AS i WHERE i.inv_id = $1",
        [invId])
        return data.rows
    } catch (error) {
        console.error('getdetailsbyid error' + error)
    }
}

async function addClassification (
    classification_name
) {
    try {
        const sql = 
        "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
        return await pool.query(sql, [
            classification_name
        ])
    } catch (error) {
        return error.message
    }
}

async function addVehicle (
    inv_make, 
    inv_model,
    inv_year,
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
) {
    try {
        const sql = 
        "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
        return await pool.query(sql, [
            inv_make, 
            inv_model,
            inv_year,
            inv_description, 
            inv_image, 
            inv_thumbnail, 
            inv_price, 
            inv_miles, 
            inv_color
        ])
    } catch (error) {
        return error.message
    }
}

module.exports = {getClassifications, getVehiclesByClassificationId, getDetailsByInvId, addClassification, addVehicle };
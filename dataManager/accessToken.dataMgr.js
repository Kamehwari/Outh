const Accesstoken  = require('../models/accessToken.models')
const mongoose = require('mongoose');

const insertData = async accessJson  =>{
    try {
        let access = new Accesstoken()
        access.user_id = (accessJson.user_id) ? accessJson.user_id : "";
        access.accesstoken =  (accessJson.accesstoken) ? accessJson.accesstoken : "";
        await access.save()
        return access;
    } catch (error) {
        throw error
    }
}



const getTokenData = async (filters ={}) =>{
    try {
       let accessDetails = await Accesstoken.find(filters)
       return accessDetails;
    } catch (error) {
        throw error
    }
}

module.exports = {
    insertData,
    getTokenData
}
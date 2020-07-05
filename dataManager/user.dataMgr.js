const User  = require('../models/user.models')
const mongoose = require('mongoose');

const insertUserData = async userJson  =>{
    try {
        let query = {"username" : userJson.username, "password" : userJson.password}
        let userDetails = await getuserData(query);
        if(userDetails && userDetails.length){
            return false
        }
        let newUser = new User();
        newUser.username = (userJson.username) ? userJson.username : "";
        newUser.password = (userJson.password) ? userJson.password : ""
        await newUser.save()
        return newUser;
    } catch (error) {
        throw error
    }
}


const isUserExist = async (username, password) =>{
    try {
        let query = {"username" : username, "password" : password}
        console.log(query)
        let userDetails = await  getuserData(query)
        if(userDetails && userDetails.length)
            return userDetails[0];
        return false;
    } catch (error) {
        throw error;
    }
}


const getuserData = async (filters={}) =>{
    try {
       let userDetails = await User.find(filters)
       console.log(userDetails)
       if(userDetails){
           return userDetails
       }
       return []
    } catch (error) {
        throw error
    }
}

module.exports = {
    insertUserData,
    isUserExist,
    getuserData
}
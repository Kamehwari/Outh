// const OAuth2Server = require("oauth2-server");
const {insertUserData, isUserExist} = require("../dataManager/user.dataMgr") 
const {sendResponse}                = require("../helpers/utils.helpers");
const {messages}                    = require('../helpers/messages.helpers')

const registerUser = async (req, res)=>{
    try {
        let user = req.body;
        console.log(user)
        if(!user.username || !user.password)
        return sendResponse(res, 401, messages.users.mandatoryFieldsMissing, "user")
        let userDetails = await isUserExist(user.username, user.password);
        if(!userDetails){
           let users=   await insertUserData(user);
           return sendResponse(res, 200, messages.users.userAdded, "user", users)
        }
        return sendResponse(res, 400, messages.users.alreadyExist, "user")

    } catch (error) {
        throw error;
    }
}

const login = async (req, res) =>{
    try {
        let user = req.body
        let userDetails = await isUserExist(user.username, user.password);
        if(!userDetails){
            return sendResponse(res, 400, messages.users.notFound, "user") 
        }
        return sendResponse(res, 200, messages.users.userFound, userDetails)
    } catch (error) {
        throw error;
    }
}
const getClient = async (clientID, clientSecret) =>{
    try {
        const client = {
            clientID,
            clientSecret,
            grants: null,
            redirectUris: null,
        };
        return client
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser, login, getClient
}


const {insertData, getTokenData} = require("../dataManager/accessToken.dataMgr") 
const {messages} = require('../helpers/messages.helpers')


const saveAccessToken = async(accessToken, user)=>{
    try {
        if(!accessToken || !(user.user_id))
             return { "status":false, "message" : messages.tokens.mandatoryFieldsMissing}
        let accessOBj = { "accesstoken" : accessToken, "user_id": user.user_id}
        await insertData(accessOBj);
        return { "status":true, "message" : messages.tokens.accessTokenAdded}
    } catch (error) {
        throw error
    }
}

const getAccessToken = async token =>{
    try {
        if(!token)
            return { "status":false, "message" : messages.tokens.tokenMissing}
        let query = {"accesstoken": token}
        let tokenDetails = await getTokenData(query)
        if(tokenDetails && tokenDetails.length)
            return { "status":true, "message" : messages.tokens.tokensFetched, data : tokenDetails[0]}
        return { "status":false, "message" : messages.tokens.notFound}
        
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
    saveAccessToken,
    getAccessToken,
    getClient
}
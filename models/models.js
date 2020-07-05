let userDtmg = require('../dataManager/user.dataMgr')
let tokenDtmg = require('../dataManager/accessToken.dataMgr')

const getClient = (clientID, clientSecret, cbFunc) =>{
    try {
        const client = {
            clientID ,
            clientSecret ,
            grants: null,
            redirectUris: null,
        };
        console.log(client)
        cbFunc(false, client);
    } catch (error) {
        console.log(error)
        throw error
    }
}

const saveAccessToken = (accessToken, clientID, expires, user, cbFunc) =>{
    try {
        console.log(accessToken, user)
        tokenDtmg.insertData({"accesstoken":accessToken, "user_id":user[0]._id}).then(result=>{
            cbFunc(false, result)
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getUser = (username, password, cbFunc) =>{
    try {
        console.log("inside get user", username, password)
        userDtmg.getuserData({"username":username, "password":password}).then(result =>{
            cbFunc(false, result)
        })
    } catch (error) {
        throw error
    }
}

const grantTypeAllowed = (clientID, grantType, cbFunc) =>{
    try {
        console.log("inside grant type")
        cbFunc(false, true)
    } catch (error) {
        throw error
    }
}

const getAccessToken = (bearerToken, cbFunc) =>{
    try {
        tokenDtmg.getTokenData({"accesstoken":bearerToken}).then(result =>{
            if(result && result[0]){
                const accessToken = {
                    user: {
                        id:  result[0]._id 
                    },
                    expires: null,
                };
                cbFunc(false, accessToken)
            }else{
                cbFunc(true, null)
            }
            
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
}
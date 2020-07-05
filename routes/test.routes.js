
const express   =       require('express');
const router    =       express.Router();
const {sendResponse}     =       require("../helpers/utils.helpers");
const models = require('../models/models')
const oAuth2Server =        require("node-oauth2-server");
let oauth = new oAuth2Server({
    model : models,
    grants: ["password"],
    debug: true,
})
// const OAuth2Server = require("oauth2-server");
// let oauth = new OAuth2Server({model:models})

router.get('/test',oauth.authorise(),  (req, res)=>{
    try {
        return sendResponse(res, 200, "Message From Test API", "test")
    } catch (error) {
        return sendResponse(res, 500, error.message, "test")
    }
})


module.exports = router;

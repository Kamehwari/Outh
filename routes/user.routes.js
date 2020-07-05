


const express   =       require('express');
const router    =       express.Router();
const models = require('../models/models')


const authenticator = require('../authenticator/oauthAuthenticator')
const oAuth2Server =        require("node-oauth2-server");
let oauth = new oAuth2Server({
    model : models,
    grants: ["password"],
    debug: true,
})
router.post('/register', authenticator.registerUser )
router.post('/login',oauth.grant(), authenticator.login)


module.exports = router;

const { expressjwt: jwt } = require("express-jwt")
require('dotenv/config')

function verifyjwt(){
    return jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
        path:[
            {url:/\/users(.*)/, methods: ['POST', 'OPTIONS']},
            {url:/\/students(.*)/, methods: ['GET', 'OPTIONS']},
            {url:/\/faculties(.*)/, methods: ['GET', 'OPTIONS']}
        ]
    })
}
module.exports = verifyjwt
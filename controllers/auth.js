var jwt = require("jsonwebtoken");
var config = require("../config/config");

const authorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let accessTokenSecret = config.JWTSECRET;

    try{
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if(!token){
                res.send({
                    msg : 'No token provided',
                    isSuccess:false
                })
            }else{
                jwt.verify(token, accessTokenSecret, (err, user) => {
                    if (err) {
                        res.send({
                            msg : "Failed to authenticate token",
                            isSuccess:false
                        });
                    }else{
                        req.user = user;
                        next();
                    }
                });
            }
        } else {
            res.send({
                msg : "No auth header",
                isSuccess:false
            });
        }
    }catch(ex){
        res.send({
            msg : "Exception occurred",
            isSuccess:false
        });
    }
};

module.exports = authorization

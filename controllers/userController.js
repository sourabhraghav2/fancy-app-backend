var User = require('../models/user');
var jwt = require("jsonwebtoken");
var config = require("../config/config");


/* jwt token generator */
async function jwtTokenGenerator(username){
    //secret used to generate token
    const accessTokenSecret = config.JWTSECRET;
    const accessToken = jwt.sign({ username: username}, accessTokenSecret, { expiresIn: '10m' });
    return accessToken;
}


const findAllUsers = async ( req, res, next ) => {
    try {
        let result = await User.find();
        if(result.length > 0){
            res.send({
                status: 200,
                msg: 'Records found',
                data: result
            });
        }else{
            res.send({
                status: 400,
                msg: 'No Record found',
                data: []
            });
        }
        

    } catch(ex) {
        res.send({
            status: 404,
            msg: 'Exception occur',
            data: ex
        });
    }
}

const findUser = async (req,res,next) => {

    try{
        let name = req.params.name;

        let result = await User.find({ username : name});
        if(result.length > 0){
            res.send({
                status: 200,
                msg: 'User found succesfully',
                data: result,
                isSuccess: true
            });
        }else{
            res.send({
                status: 400,
                msg: 'No user with this username',
                data: [],
                isSuccess : false
            });
        }
    }catch(ex){
        res.send({
            status: 404,
            msg: 'Exception occur',
            data: ex,
            isSuccess : ""
        });
    }

}

const deleteUser = async (req,res,next) => {

    try{
        console.log ('req.params.username : ',JSON.stringify(req.params.username))
        const username = req.params.username;
        const result = await User.find({ username : username});
        if(result.length > 0){
            const username = result[0].username;
            const deletionResult = await User.remove({ username : username});
            if(deletionResult.ok == 1){
                res.send({
                    msg: 'User deleted succesfully',
                    isSuccess: true
                });
            }else{
                res.send({
                    msg: 'Error in deletion',
                    isSuccess : false
                });
            } 
        }else{
            res.send({
                msg: 'No user found',
                isSuccess : false
            });
        }
    }catch(ex){
        res.send({
            msg: ex,
            isSuccess : false
        });
    }

}

const update = async (req,res,next) => {
    try{
        const query = {'username': req.body.username};
        const response=await User.findOneAndUpdate(query, req.body);
        console.log ('response: ',JSON.stringify(response))
        if(response){
            res.send({
                msg: 'User updated succesfully',
                isSuccess: true
            });
        }else{
            res.send({
                msg: 'User update failed',
                isSuccess : false
            });
        }
    }catch(ex){
        res.send({
            msg: ex,
            isSuccess : false
        });
    }
}

const create = async (req,res,next) => {
    try{
        const username=req.body.username;
        const newUser= new User();
        newUser.username= req.body.username;
        newUser.password= req.body.password;

        let getOneUserData = await User.find({username : username});
        if(getOneUserData.length > 0){
            res.send({
                msg: 'User already exist in database',
                isSuccess: false
            });
        }else{
            let result = await newUser.save();
            if(result){
                let generatedJwtToken = await jwtTokenGenerator(username);
                res.send({ 
                    msg: 'User created succesfully',
                    jwtToken: generatedJwtToken,
                    isSuccess: true
                });
            }else{
                res.send({
                    msg: 'Error in insertion',
                    jwtToken : null,
                    isSuccess : false
                });
            }
        }
    } catch(ex) {
        res.send({
            msg: ex,
            jwtToken : null,
            isSuccess : false
        });
    }
}

const login = async (req,res,next) => {

    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = await User.find({ username : username, password : password});
        console.log('result : ',JSON.stringify(result))
        if(result.length > 0){
            res.send({
                jwtToken: await jwtTokenGenerator(result[0].username),
                language:result[0].language,
                privacy:result[0].privacy,
                isSuccess : true,
            });
        }else{
            res.send({
                msg: "Username or password is incorrect",
                jwtToken: null,
                isSuccess : false
            });
        }
    }catch(ex){
        res.send({
            msg: ex,
            jwtToken: null,
            isSuccess : false
        });
    }

}

module.exports = {
    findAllUsers,
    create,
    findUser,
    deleteUser,
    login,
    update
};
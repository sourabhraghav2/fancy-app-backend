
var Language = require('../models/language');

var config = require("../config/config");


const findLanguage = async (req,res,next) => {
    try{
        const language = req.params.language;
        const result = await Language.find({ language : language});
        if(result.length > 0){
            res.send({
                data: result.map(each=>each.languageMap).find(each=>each),
                isSuccess: true
            });
        }else{
            res.send({
                msg: 'No Language',
                isSuccess : false
            });
        }
    }catch(ex){
        res.send({
            msg: `Exception : ${JSON.stringify(ex)}`,
            isSuccess : false
        });
    }

}

const findAllLanguages = async ( req, res, next ) => {
    try {
        let result = await Language.find();
        if(result.length > 0){
            res.send({
                isSuccess:true,
                data: result
            });
        }else{
            res.send({
                isSuccess:false,
                data: []
            });
        }
    } catch(ex) {
        res.send({
            isSuccess:false,
            data: ex
        });
    }
}
const create = async ( req, res, next ) => {
    try{
        const language=req.body.language;
        const newLanguage= new Language();
        newLanguage.language= req.body.language;
        newLanguage.languageMap= req.body.languageMap;
        console.log ('map : ',JSON.stringify(req.body))
        console.log ('language : ',JSON.stringify(req.body.language))
        let getOneLanguage = await Language.find({language : language});
        
        if(getOneLanguage.length > 0){
            res.send({
                msg: 'Language already exist in database',
                isSuccess: false
            });
        }else{
            let result = await newLanguage.save();
            if(result){
                res.send({ 
                    msg: 'Language created succesfully',
                    isSuccess: true
                });
            }else{
                res.send({
                    msg: 'Error in insertion',
                    isSuccess : false
                });
            }
        }
    } catch(ex) {
        console.log("Error : ",ex )
        res.send({
            msg: ex,
            isSuccess : false
        });
    }
}


module.exports = {findAllLanguages,create,findLanguage};
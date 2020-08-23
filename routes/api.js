var express = require('express');
var router = express.Router();
var verify = require('../controller/category.controller');
var post = require('../controller/post.controller');
var userController = require('../controller/user.login');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var uploadController = require('../controller/upload.controller');


const storage = multer.diskStorage({
    destination :(req,file,callback)=>{
        callback(null, '../user/src/assets/uploads')
    },
    filename:(req,file,callback)=>{
        callback(null, file.originalname);
    }
});

const upload = multer({storage : storage});

router.post('/uploads-file',upload.any(), uploadController.uploadFile);


router.get('/category-select',authentication,verify.select);
router.post('/category-insert',authentication,verify.insert);
router.post('/category-remove',authentication,verify.remove);
router.post('/category-update',authentication,verify.update);
router.post('/category-details',authentication,verify.details);

router.get('/post-select',authentication,post.select);
router.post('/post-insert',authentication,post.insert);
router.post('/post-remove',authentication,post.remove);
router.post('/post-update',authentication,post.update);
router.post('/post-sort',authentication,post.sort);


router.post('/insert-user',userController.userInsert);
router.post('/verify-user',userController.verifyUser);

router.get('/get-all-category',verify.select);
router.get('/get-all-post',post.select);
router.post('/get-sorted-post',post.sort);

function authentication(req, res, next){
 
    var bearerToken = req.headers.token;

    if (typeof (bearerToken) != undefined){

        jwt.verify( bearerToken , '1234' , (err)=>{

            if(err){
                res.json({
                    status:"NOK",
                    message:err
                })
            }

            else{
                next();
            }

        })
    }


}


module.exports = router;
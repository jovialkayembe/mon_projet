const { Router } = require('express');
const authController = require('../controllers/authControllers');
const multer = require('multer');
const path = require('path') ;

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,path.join(__dirname, '../public/userImages'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null, name);
    }
    });
 
const upload = multer({storage:storage})



const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup',upload.single('image'), authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router; 
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',function(req,res,next){
	res.send(req.flash());
})

router.post('/',checkLogin,function(req,res,next){
	res.send(req.flash())
})



router.get('/create',checkLogin,function(req,res,next){
	res.send(req.flash());
})

router.get('/:ablumId',function(req,res,next){
	res.send(req.flash());
})

router.post('/:ablumId/edit',checkLogin,function(req,res,next){
	res.send(req.flash());
})

router.get('/:ablumId/remove',checkLogin,function(req,res,next){
	res.send(req.flash());
})

router.post('/:ablumId/comment',checkLogin,function(req,res,next){
	res.send(req.flash());
})

router.get('/:ablumId/comment/:commentId/remove',checkLogin,function(req,res,next){
	res.send(req.flash());
})


module.exports = router;
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req,res,next) {
	res.send(req.flash())
})

module.exports = router;
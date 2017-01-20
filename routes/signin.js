var express = require('express');
var router = express.Router();
var sh1 = require('sha1');
var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res,next){
    res.render('signin')
})
router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.username;
    var password = req.fields.password;
    console.log(req.fields)
    UserModel.getUserByName(name)
        .then(function(user) {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }
            if (sha1(password) !== user.password) {
                req.flash('error', '用户名或者密码错误');
                return req.redirect('back');
            }
            req.flash('success', '登录成功');
            //将用户信息写入到session
            delete user.password;
            req.session.user = user;
            //跳转到主页
            req.redirect('/ablums');
        })
        .catch(next);
})

// router.post('/', checkNotLogin, function(req, res, next) {
// 	console.log(1);
//     var name = req.fields.username;
//     var password = req.fields.password;

//     UserModel.getUserByName(name)
//         .then(function(user) {
//             if (!user) {
//                 req.flash('error', '用户不存在');
//                 return res.redirect('back');
//             }
//             // 检查密码是否匹配
//             if (sha1(password) !== user.password) {
//                 req.flash('error', '用户名或密码错误');
//                 return res.redirect('back');
//             }
//             req.flash('success', '登录成功');
//             // 用户信息写入 session
//             delete user.password;
//             req.session.user = user;
//             // 跳转到主页
//             res.redirect('ablums');
//         })
//         .catch(next);
// });


module.exports = router;

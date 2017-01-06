//注册页面
var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users')
var checkNotLogin = require('../middlewares/check').checkNotLogin;
//get 注册页
router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signup')
})

//post 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.username;
    var gender = req.fields.gender;
    var email = req.fields.email;
    var bio = req.fields.bio;
    //图片上传的处理
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;
    //校验
    console.log(req.fields)
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('姓名请限制在1-10个字符内');
        }
        if (!['m', 'f', 'x'].indexOf(gender)) {
            throw new Error('性别请输入正确');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像')
        }
        if (password.length < 6) {
            throw new Error('密码至少6个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入的密码不一致');
        }
    } catch (e) {
        //注册失败，删除上传的头像
        //console.log(e) 
        console.log(1);
        fs.unlink('req.files.avatar.path');
        req.flash('error', e.message);
        return res.redirect('signup');
    }
    password = sha1(password);
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };
    UserModel.create(user)
        .then(function(result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            console.log(3)
            user = result.ops[0];
            //将用户信息存入session
            delete user.password;
            req.session.user = user;
            //写入 flash
            req.flash('success', '注册成功');
            //
            res.redirect('/ablums');
        }).catch(function(e) {
            console.log(2);
            console.log(e);
            //注册失败，删除上传的头像
            fs.unlink('req.files.avatar.path');
            //用户名重复注册
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已经被占用');
                return res.redirect('signup');
            }
            next(e);
        })

})
module.exports = router;

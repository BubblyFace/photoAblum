var config = require('config-lite');
var Mongolass = require('Mongolass');
var mongolass = new Mongolass();

mongolass.connect(config.mongodb);
//姓名，密码，头像，性别，个人简介,姓名为唯一主键
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    email:{type:'string'},
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
})

//根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec();

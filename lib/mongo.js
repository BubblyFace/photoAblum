var config = require('config-lite');
var Mongolass = require('Mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var onjectIdToTimestamp = require('objectid-to-timestamp')
mongolass.connect(config.mongodb);

//根据id 生成时间 creat_at
mongolass.plugin('addCreatedAt', {
        afterFind: function(results) {
            results.forEach(function(item) {
                item.created_at = moment(onjectIdToTimestamp(item._id).format('YYYY-MM-DD HH:mm'));
            })
            return results;
        },
        afterFindOne: function(result) {
            if (result) {
                result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
            }
            return result;
        }

    })
    //姓名，密码，头像，性别，个人简介,姓名为唯一主键
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
})

//根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec();

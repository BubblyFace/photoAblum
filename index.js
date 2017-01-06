var path = require('path');
var jade = require('jade')
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes/index');
var pkg = require('./package');
var app = express();
var fortune = require('./public/javascripts/cookiesTest')
var weatherPart = require('./public/javascripts/weatherPart')
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// var handlebars = require('express3-handlebars')
//     .create({ defaultLayout: 'main' });
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser')())
    //创建一个中间件来返回数据对象
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: { maxAge: config.session.maxAge },
    store: new MongoStore({
        url: config.mongodb
    })
}))

app.use(flash())

//处理表单和文件的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/images/avatar'), //上传头像的目录
    keepExtensions: true //保留图片后缀
}))

//模版全局变量
app.locals.ablum = {
    title: pkg.name,
    description: pkg.description
};

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

routes(app);

// app.use(function(req, res) {
//     res.status(404);
//     res.render('404')
// })

// app.use(function(err, req, res, next) {
//     res.status(500);
//     res.render('500')
// })

app.use(function(err, req, res, next) {
    res.render('error', {
        error: err
    });
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate.');
})

// // 设置模板目录
// app.set('views', path.join(__dirname, 'views'));
// // 设置模板引擎为 ejs
// app.set('view engine', 'ejs');

// // 设置静态文件目录
// app.use(express.static(path.join(__dirname, 'public')));
// // session 中间件
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
//     secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
//     cookie: {
//         maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
//     },
//     store: new MongoStore({ // 将 session 存储到 mongodb
//         url: config.mongodb // mongodb 地址
//     })
// }));
// // flash 中间价，用来显示通知
// app.use(flash());
// console.log(routes[0]);

// // 路由
// routes(app);

// // 监听端口，启动程序
// app.listen(config.port, function() {
//     console.log(`${pkg.name} listening on port ${config.port}`);
// });

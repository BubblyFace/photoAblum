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

app.set('port', process.env.PORT || 3000)
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('view engine', 'jade');
    // 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('home')
});

app.get('/about', function(req, res) {
    var binggan = require('/Users/haoweisun/Desktop/work/项目设计/photoAblum/public/javascripts/cookiesTest');
    console.log(binggan.text);
    bingganText = binggan.text.toString();
    res.render('about', {
        binggan: bingganText,
        name: "sunhaowei"
    })
})

app.get('/about/1', function(req, res) {

})


app.use(function(req, res) {
    res.status(404);
    res.render('404')
})

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500);
    res.render('500')
})

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

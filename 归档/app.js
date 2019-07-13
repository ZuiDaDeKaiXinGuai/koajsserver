const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routerConfig = require('./router/config')
const mysqlConfig = require('./db/config')
const validator = require('./utils/validator')
const authConf = require('./utils/authConf')
let app = new Koa()
app.use(authConf)
// app.use((ctx,next)=>{
    
//     let time = Date.now()
//     next()
//     console.log(ctx.url, (Date.now()-time)/1000)
// })

//配置POST支持
app.use(bodyParser())

//验证规则
validator(app)
// 配置数据库
mysqlConfig(app)

// 配置程序路由
app.use(routerConfig('controller'))
app.listen(8888,()=>{console.log(`server start at port 8888`)})
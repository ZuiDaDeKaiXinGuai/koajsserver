
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const utils = require('../utils')
const svgCaptcha = require('svg-captcha')

let count =0
//redis
let sessionCache = {}
let captcha = async (ctx)=>{
    let {data,text} = svgCaptcha.create({
        size:4,
        ignoreChars: '0o1il',
        noise: 3,
        background: '#cc9966',
    })
    
    text = text.toLocaleLowerCase()
    data = data.replace('width="150"','').replace('height="50"','')
    sessionCache[text] = ++count
    ctx.cookies.set('count',count,{
        path:'/login',   //cookie写入的路径
        httpOnly:false,
        overwrite:false
    }),
    ctx.body={
        code:1,
        data,
    }
}

let register = async (ctx) => {

    let { user_name, user_pwd } = ctx.request.body

    let valideErr = await ctx.validate({
        user_name: 'string',
        user_pwd: 'string'
    }, ctx.request.body)
    if(valideErr.length>0){
        ctx.body = {
            code: 0,
            results: valideErr
        }
        return 
    }
    let cipheredPwd = utils.cipher(user_pwd)
    let uid = uuid()
    let [error,results] = await ctx.mysql(`insert into users (user_name, user_pwd, mid) values ('${user_name}','${cipheredPwd}','${uid}')`)

    ctx.body = {
        code: error?0:1,
        results: error || results
    }
}

let login = async (ctx, next) => {
    let error = await ctx.validate({
        user_name: 'string',
        user_pwd: 'string',
        captcha:"string"
    }, ctx.request.body)
    if(error.length>0){
        ctx.body={
            code:0,
            msg:error
        }
        return
    }
    let count = ctx.cookies.get('count')
    let { user_name, user_pwd, captcha } = ctx.request.body
    if(!user_name||!user_pwd){
        ctx.body={
            code:0,
            msg:"信息不全"
        }
        return
    }
    
    if(sessionCache[captcha] != count){
        ctx.body={
            code:0,
            message:"验证码错误"
        }
        return 
    }
    let cipheredPwd = utils.cipher(user_pwd)
    let token = jwt.sign(user_name, 'jack')

    let [err, results] = await ctx.mysql(`select * from users where user_name='${user_name}' and user_pwd='${cipheredPwd}'`)
    if(err){
        ctx.body={
            code:0,
            message:err
        }
    }
    if(results.length>0){
        ctx.response.body = {
            code: 1,
            token,
            message: "success"
        }
    }else{
        ctx.body={
            code:0,
            message:"密码错误，或者未注册"
        }
    }
}


module.exports = {
    'POST /register': register,
    'POST /login': login,
    'GET /captcha': captcha,
}
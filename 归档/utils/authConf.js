const jwt = require('jsonwebtoken')
module.exports = async (ctx,next)=>{
    let whitelist = ['/login','/register','/captcha']

    if(whitelist.includes(ctx.url) ){
        await next()
    }else{
        let token = ctx.get('authorization')
        try{
            let decoded = jwt.verify(token, 'jack')
            await next()
        }catch(err){
            ctx.response.status = 401
            ctx.body ={
                code:0,
                msg:err
            }
        }
    }
}
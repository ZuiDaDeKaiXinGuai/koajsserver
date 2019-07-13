
const uuid = require('uuid/v4')
let create = async ctx=>{
    let validRes = await ctx.validate({
        user_name:'string',
        user_pwd:'string',
        phone:'string',
        email:'email',
        nickname:'string',
        gender:'string'
    },ctx.request.body)
    if(validRes.length>0){
        ctx.body={
            code:0,
            msg: validRes
        }
        return
    }
    let {user_name, user_pwd, phone, email, nickname,gender}=ctx.request.body;
    let uid = uuid()
    let [err,res] = await ctx.mysql(`insert into user_info (uid, user_name, user_pwd, phone, email, nickname, gender) values ('${uid}','${user_name}', '${user_pwd}',
    '${phone}','${email}', '${nickname}', '${gender}') `)
    ctx.body={
        code: err?0:1,
        msg: err?err:res
    }
}
let $delete = async ctx=>{
    let validRes = await ctx.validate({
        uid:'string'
    },ctx.request.body)
    if(validRes.length>0){
        ctx.body={
            code:0,
            msg: validRes
        }
        return
    }
    let {uid}=ctx.request.body;

    let [err,res] = await ctx.mysql(`delete from user_info where uid='${uid}'`)
    ctx.body={
        code: err?0:1,
        msg: err?err:res
    }
}
let list = async ctx=>{
    let [err,res] = await ctx.mysql(`select * from user_info`)
    ctx.body={
        code: err?0:1,
        msg: err?err:res
    }
}

module.exports = {
    'POST /create':create,
    'DELETE /delete':$delete,
    'GET /list':list,
}
const Parameter = require('parameter')
let parameter = new Parameter()
module.exports = (app)=>{
    //把一个普通函数吧变成promise，只需在该函数内部return一个promise
    app.context.validate = (valid, data)=>{
        return new Promise((resolve,reject)=>{
            let error = parameter.validate(valid,data)
            if(!error){
                resolve([])
            }else{
                resolve(error)
            }
        })
    }
}
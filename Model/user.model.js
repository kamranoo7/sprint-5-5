let mongoose=require("mongoose")


let userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    city:String
})

let UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}
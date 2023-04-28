let express=require("express")
const { UserModel } = require("../Model/user.model")
let userRouter=express.Router()
let bcrypt=require('bcrypt')
let jwt=require("jsonwebtoken")
//Register
userRouter.post("/register",async(req,res)=>{
    let {email,pass,name,city}=req.body
    let user=await UserModel.findOne({email})
    if(user){
        res.status(400).send({"msg":"user already exist Please Login"})
        
    }else{
        try{
            bcrypt.hash(pass,5, async(err, hash)=> {
                let user=new UserModel({email,name,city,pass:hash})
        
        await user.save()
        res.status(200).send({"msg":"New user has been register"})
            });
            
        
        }catch(err){
        res.status(400).send({"msg":err.message})
        }
    }

})
//login
userRouter.post("/login",async(req,res)=>{
let {email,pass}=req.body
try{
let user=await UserModel.findOne({email})
if(user){
    bcrypt.compare(pass, user.pass, (err, result)=> {
        // result == true
        if(result){
            let token=jwt.sign({authorID:user._id,author:user.name},"masai")
            res.status(200).send({"msg":"Login Successfully","token":token})
        }
        else{
            res.status(200).send({"msg":"Wrong Credential"})
        }
        
    });
  
    // console.log(user)
}else{
    res.status(200).send({"msg":"Wrong Credential"})
}




}catch(err){
    res.status(400).send({"msg":err.message})
}
})

module.exports={
    userRouter
}
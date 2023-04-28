let express=require('express')
const { NoteModel } = require("../Model/notes.model")

let noteRouter=express.Router()


noteRouter.post("/create",async(req,res)=>{
try{
    let note=new NoteModel(req.body)
    await note.save()
    res.status(200).send({"msg":"new note has been added"})
}catch(err){
    res.status(400).send({"msg":err.message})
}
})
noteRouter.get("/",async(req,res)=>{
try{
    let notes=await NoteModel.find({authorID:req.body.authorID})
    //console.log(notes)
    res.status(200).send(notes)
}catch(err){
    res.status(400).send({"msg":err.message})
}
})
noteRouter.patch("/update/:noteID",async(req,res)=>{
    let {noteID}=req.params
    let note=await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.authorID!==note.authorID){
            res.status(200).send("You are not authorised")
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send("the note with noteID has been updated")
        }
     
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
noteRouter.delete("/delete/:noteID",async(req,res)=>{
    let {noteID}=req.params
    let note=await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.authorID!==note.authorID){
            res.status(200).send("You are not authorised")
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID},req.body)
            res.status(200).send("the note with noteID has been deleted")
        }
     
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    noteRouter
}
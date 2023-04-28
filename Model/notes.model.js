let mongoose=require("mongoose")


let noteSchema=mongoose.Schema({
    title:String,
    body:String,
   author:String,
   authorID:String,
   category:String
})

let NoteModel=mongoose.model("note",noteSchema)
module.exports={
   NoteModel
}
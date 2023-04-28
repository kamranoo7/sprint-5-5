let express=require("express")
let cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Route/user.route")

require("dotenv").config()
const { auth } = require("./Middleware/auth.middleware")
const { noteRouter } = require("./Route/notes.route")
let app=express()
app.use(cors())
// mongodb://127.0.0.1:27017/mongo
app.use(express.json())

app.use('/users',userRouter)


app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log(err)
        console.log("not connected to Db")
    }
    console.log("server is running at 8080")
})
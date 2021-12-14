import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectdb.js";
import {Todo} from "./schema/todoShema.js";
import cors from "cors";
dotenv.config();


connectDB();

const app = express();
const port = process.env.PORT ||5000;
app.use(cors());

//home route
app.get("/",(req,res) =>{
    res.send("<h1>This is my to do app Ginger</h1>");
});
//middle ware
app.use(express.json());

//port route for cterte a todo
app.post("/todos",async(req,res)=>{
    const{title,discription,status,date_time} =req.body;
    const todo = await Todo.create({
        title,
        discription,
        status,
        date_time
    });

    if (todo){
       return res.status(201).json({
            success:true,
            date:todo,
            message:"Todo Created successfully"
        })
    }
    else{
        return res.status(400).json({
        success:false,
        message:"Todo not created"

    })}
}
)

//get route for retriving all todo
app.get("/todos",async(req,res)=>{
    const todos = await Todo.find();
    if(todos){
        return res.status(200).json({
            success:true,
            date:todos,
            message:"Todo recived successfully",
        })
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Todo not retrived",
        })
    }
})

//updata route updating a todo
app.patch("/todos/:id",async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    const todo=await Todo.undateOne({status}).where({id});
    if(todos){
        return res.status(200).json({
            success:true,
            date:todos,
            message:"Todo updated successfully",
        })
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Todo not updated",
        })
    }
})

//deletd route for deleting a todo
app.delete("/todos/:id",async(req,res)=>{
   const{id} = req.params;
   await Todo.deleteOne({_id:id});
   return res.status(200).json({
       success:true,
       message:"Todo deleted succssfully",
   })

})

//listen to port
app.listen(port,()=>console.log(`server running on port ${port}`));
import bodyParser from "body-parser";
import axios from "axios";
import express from "express";

const port=3000;
const app=express();
const url="https://www.themealdb.com/api/json/v1/1/random.php";

app.use (express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const result=await axios.get(url);
        res.render("index.ejs",{data:result.data.meals[0]})
        console.log(result.data.meals[0]);
    } catch(err){
        res.send(err);
    }
})

app.listen (port,()=>{
    console.log(`Server is running on port ${port}`);
})
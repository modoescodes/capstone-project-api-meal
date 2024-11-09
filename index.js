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
                // Loop through the ingredients and measures
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = result.data.meals[0][`strIngredient${i}`];
            const measure = result.data.meals[0][`strMeasure${i}`];

        // Only push non-empty ingredients
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({ ingredient, measure });
            }
        }
        res.render("index.ejs",{data:result.data.meals[0], ingredients:ingredients})
    } catch(err){
        res.send(err);
    }
})

app.listen (port,()=>{
    console.log(`Server is running on port ${port}`);
})
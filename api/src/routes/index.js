const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {YOUR_API_KEY}=process.env
const router = Router();
const {Recipe,Diet} = require('../db');
const { getALLRecipes,getDBrecipesID,getAPIrecipesID } = require('../services/recipes');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




router.get('/recipes',async function (req,res) {
    try {
        let {name} = req.query
        const recipes= await getALLRecipes()
        console.log('first')
        if (name) {
            let filtered = await recipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()))
            if (filtered.length) {
                let washed = filtered.map(e => {
                    return {
                        image: e.image,
                        name: e.name,
                        diets: e.diets,
                        id: e.id
                    }
                })
                return res.json(washed)
            }
            return res.status(404).json("no recipes found")
        }else{
            let washed = recipes.map(e => {
                return {
                    image: e.image,
                    name: e.name,
                    diets: e.diets,
                    id: e.id
                }
            })
            return res.json(washed)
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.get('/recipes/:idRecipe', async function (req,res) {
    try {
        let {idRecipe}=req.params
        if (idRecipe.length===36) {
            let DBrecipe = await getDBrecipesID(idRecipe)
            if (DBrecipe) return res.json(DBrecipe)
        }else{
            let APIrecipe = await getAPIrecipesID(idRecipe)
            if (APIrecipe.data.id) {
                let washed = {
                    name: APIrecipe.data.title,
                    image: APIrecipe.data.image,
                    dishTypes: APIrecipe.data.dishTypes,
                    healthScore: APIrecipe.data.healthScore,
                    summary: APIrecipe.data.summary,
                    diets: APIrecipe.data.diets,
                    steps: APIrecipe.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.json(washed)
            }
        }
        throw new Error
    } catch (error) {
        res.status(404).json('Recipe not found')
    }
})

router.get('/diets', async (req,res) => {
    let types = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "lacto ovo vegetarian",
        "primal",
        "whole 30",
        "fodmap friendly",
        "ketogenic",
        "pescatarian",
        "vegan"
    ]
    types.forEach(e=> {
        Diet.findOrCreate({
            where: { name: e }
        })
    });
    let dietTypes = await Diet.findAll()
    return res.send(dietTypes)
})

router.post('/recipes', async  (req,res) => {
    try {
        const {name,summary,healthScore,steps,diets} = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
        })
        let dietTypes = await Diet.findAll({
            where: { name: diets}
        })
        
        await newRecipe.addDiet(dietTypes)
        return res.send('OK aguante racing')

    } catch (error) {
        return res.status(400).send(error.message)
    }
})




module.exports = router;



const axios = require("axios");
const { Diet, Recipe } = require("../db");
   const {API_KEY} = process.env; 


const getDiets = async (req, res) => { 
  try { 
    const dietas = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
      
    const types = await dietas.data.results.map((t) => t.diets);  
    const diets = types.flat();
    // console.log(diets)
    const typeDiets = [...new Set(diets)]; 
    console.log(typeDiets)
    typeDiets.forEach(async (d) => {
      await Diet.findOrCreate({ 
        where: { name: d }, 
      });
    });
    const allDiets = await Diet.findAll();
    return allDiets;
  } catch (error) {
    console.log(error); 
  }
};

const dietas = async (req, res) => {
  try {
    const d = await Diet.findAll();
    res.send(d);
  } catch (e) {
    res.status(404).send({msg:"error"})
  }
}; 
module.exports = {
  getDiets,
  dietas,
};
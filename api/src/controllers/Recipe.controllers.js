const axios = require("axios");
const { Diet, Recipe } = require("../db");
  const {API_KEY} = process.env;
  // const respuesta = require("../../respuesta.json") 

const getApiData = async () => {  
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
        //  let apiUrl = respuesta;
    const apiData = apiUrl.data.results.map((recipes) => { 
      return {   
        id: recipes.id.toString(),
        image: recipes.image,
        name: recipes.title.toLowerCase(), 
        type: recipes.diets,
        summary: recipes.summary,
        score: recipes.spoonacularScore ? recipes.spoonacularScore : Math.floor(Math.random() * 10) + 1,
        healthyScore: recipes.healthScore,
        dishTypes: recipes.dishTypes,
        steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
          return {
            number: s.number, 
            step: s.step,
          };
        }),
      };
    });
    return apiData;
  } catch (e) {
    console.log(e);
  }
};

const dbData = async () => {
  const del = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });
  return del;
};

const allRecipes = async () => {
  const api = await getApiData();
  const db = await dbData();  
  const all = api?.concat(db);
  return all;
};

const getByName = async (req, res) => { 
  try {
    const { name } = req.query;

    const recipe = await allRecipes();
    if (name) {
      const fil = recipe.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      fil.length ? res.send(fil) : res.status(404).send({ msg: "not found" });
    } else {
      return res.send(recipe);
    }
  } catch (e) {
    console.log(e);
  }
};

const getIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await allRecipes(id);
    if (id) {
      const busqueda = findId.filter((el) => el.id === id);

      busqueda.length
        ? res.send(busqueda)
        : res.send({ msg: "error" });
    } else {
      res.send({ msg: "Ivalid ID" });
    }
  } catch (error) { 
    res.status(404).send({ msg: "Ivalid ID" });
  }
};

const getPost = async (req, res) => {
  const { name, summary, score, healthyScore, steps, type, image, dishTypes,createdInDb } =
    req.body;
  try {
    const nuevaReceta = await Recipe.create({
      name,
      summary,
      score,
      healthyScore,
      steps,
      image,
      dishTypes, 
      createdInDb,
      
    });

    const dietas = await Diet.findAll({
      where: { name: type },
    });
    await nuevaReceta.addDiet(dietas); 

    return res.status(200).send({ msg: "Successfully Created" });
  } catch (e) { 
    console.log(e);
  }
};


const deleted = async(req,res)=>{
  let {id}=req.params
  await Recipe.destroy({
    where: {
     id: id
    }
   }).then(e => {
    if (!e) {
     return res.status(404).send({error: 'No user'});
    }
    res.status(204).send();
   });
}


module.exports = {
  getApiData,
  getByName,
  getIdRecipe,
  getPost,
  dbData,
  allRecipes,
  deleted
  
};
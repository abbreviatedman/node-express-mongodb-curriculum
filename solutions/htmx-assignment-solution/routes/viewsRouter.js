const express = require('express');

const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/", async (_, res) => {
  try{
    const recipes = await Recipe.find({});
    res.render("index", { recipes: recipes });
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error loading recipes",
      message: "Please hit refresh to try again.",
      links: [{
        href: "/recipes",
        text: "Refresh"
      }]
    })
  };
});

router.get("/recipes", async (_, res) => {
  try {
    const recipes = await Recipe.find({});
    res.render("recipes", { recipes: recipes });
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error loading recipes",
      message: "Please hit refresh to try again.",
      links: [{
	href: "/recipes",
	text: "Refresh"
      }]
    })
  };
});

router.get("/about", async (_, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error loading about page",
      message: "Short version: we're pretty cool.",
      links: [
        {
	  href: "/recipes",
	  text: "Go back home."
        },
        {
          href: "/about",
          text: "Try our about page again."
        },
      ]
    })
  };
});

router.get("/contact", async (_, res) => {
  try {
    res.render("contact");
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error loading contact page",
      message: "Email us at hello@nobledesktop.com to reach us. And let us know an error occurred!",
      links: [
        {
	  href: "/recipes",
	  text: "Go back home."
        },
        {
          href: "/contact",
          text: "Try our contact page again."
        },
      ]
    })
  };
});

router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      const recipes = await Recipe.find({});
      res.render("recipes", {recipes: recipes});

      return
    }
      
    res.render("recipe", {recipe: recipe});
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error loading recipe page",
      message: "Sorry, we couldn't load that recipe! Go back home to see the list again.",
      links: [{
	href: "/recipes",
	text: "Go back home."
      }]
    })
  }
})

router.delete('/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    const recipes = await Recipe.find({});
    res.render("recipes", {recipes: recipes});
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error deleting recipe",
      message: "Sorry, we couldn't delete that recipe! Go back home to see the list again.",
      links: [{
	href: "/recipes",
	text: "Go back home."
      }]
    })
  }
})

router.get('/add-form', (_, res) => {
  res.render('add-form');
})

router.get('/add-button', (_, res) => {
  res.render('add-button');
})

router.post('/recipes', async (req, res) => {
  try {
    req.body.ingredients = req.body.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    req.body.instructions = req.body.instructions
      .split(",")
      .map((instruction) => instruction.trim());

    await Recipe.create(req.body);
    const recipes = await Recipe.find({});
    res.render("recipes", {recipes: recipes});
  } catch (error) {
    console.log(error);
    res.render("error", {
      headline: "Error adding recipe",
      message: "Sorry, we couldn't add that recipe! Go back home to see the list again.",
      links: [{
        href: "/recipes",
        text: "Go back home."
      }]
    })
  }
});

module.exports = router;

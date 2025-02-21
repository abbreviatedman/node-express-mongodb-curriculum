# HTMX - Assignment

We're going to build our own HTMX app, a recipe book. This readme will give you the general guidelines. You should reference the HTMX lesson if you feel lost, as well as the [HTMX documentation](https://htmx.org/), which is very good.

### Setup

Setup is similar to our todo app. You must:

- Run `npm install` to install dependencies.
- Create a database and collection in MongoDB. The collection should be called `recipes`.
- Import the recipes from `models/recipes.json` into your collection.
- Create a `.env` file with a `MONGODB_URI` variable that contains your connection string. Don't forget to add your database name to the end of the connection string, after the `/`.

### Step 1: Displaying Recipes

Right now, our back end view router file is rendering the `index.ejs`file at the `/` route, but with an empty array for recipes. Edit that `/` route to grab the recipes from the database and render `index.ejs` with them. `index.ejs` includes `recipes.ejs` (with `<%- include('recipes', {recipes: recipes}) %>`). The `forEach` loop in `recipes.ejs` should display the recipes if we render them with `index.ejs` from the back end.

Reload the page to confirm this works.

### Step 2: Adding About and Contact Pages

- Add GET route handlers for `/recipes`, `/about`, `/contact`. They should each send back _only_ the EJS files for those pages.
- Add HTMX to the front end to load those pages in place when the navbar `a` tags are clicked--so put the `hx-` attributes on them. You'll need:
  - `hx-get` to the right route
  - `hx-target` set to `main`
  - `hx-swap` set to `innerHTML` (to replace what's _in_ `main`)
  
**Notes**:

- It might _seem_ helpful to re-use the `/` route handler for when the user clicks the Recipes navbar item, since that route _does_ render the recipes. But the `/` route handler returns an _entire page_, which you do not want in this instance--it's more efficient to just send back the recipes, so only the `recipes.ejs` needs to be re-rendered. The `/recipes`  route handler should be replacing the `main` tag with the `recipes.ejs` content _only_.
- While the `a` tags _do_ have an `href` attribute, it's HTMX that will handle the navigation. They are there for styling and accessibility.

### Step 3: A Single Recipe View

- Add a route handler for `/recipe/:id` that sends back an EJS file for a single recipe. (You'll have to make this file.) When the user clicks on a recipe in the recipes list, **we will replace the recipes list with that single recipe.**
- Add HTMX to each recipe in `recipes.ejs` to make a call to the correct recipe route when a recipe is clicked. You'll need:
  - `hx-get` to the right route--remember that you'll have to include the id in the route you hit!
  - `hx-target` to `main`
  - `hx-swap` set to `innerHTML` (to replace what's _in_ `main`)
- The single-recipe EJS file you make should display the recipe's name, ingredients, and steps. It should also ideally have a back button to return to the main page, but, if not, the user can click the navbar item.

### Bonus

For the below, remember to update in place using HTMX, _not_ sending the user to a new page!

We're only doing the R in CRUD right now. In any order (but this is likely from easiest to hardest), add the following feature:

- The user can delete a recipe.
- The user can add a recipe.
- The user can edit a recipe.

When doing so, don't forget that the ingredients and steps properties are arrays. You can take them in as a comma-separated list in an input box and convert to an array. `Array.join` and `String.split` are helpful here!

For an extra UX nicety, when adding and editing recipes, give the user separate input boxes for each ingredient/step. Research how to make those input boxes come in in the request body as an array.

For an _extra_ extra UX nicety, place a button at the bottom of a group of ingredients/instructions input boxes that adds a new input box and a button to the right of each input box to remove unused ones.

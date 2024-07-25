import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  const id = window.location.hash.slice('1');
  if (!id) return;
  recipeView.renderSpinner();
  try {
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err, 'error');
  }
};

window.addEventListener('load', controlRecipes);
window.addEventListener('hashchange', controlRecipes);

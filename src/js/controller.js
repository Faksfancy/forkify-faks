import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import shopListView from './views/shopListView.js';

import { async } from 'regenerator-runtime';

//console.log(`test`);

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // loading recipe

    resultView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);

    //rendering recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView._renderMarkupError();
  }
};
//controlRecipe();

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResult(query);

    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultView._renderMarkupError();
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe serving in state
  model.updatingServings(newServings);
  //update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookamrk(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //update recipeview
  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView._renderMarkupSucess();
    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, ``, `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`|*`, err);
    addRecipeView._renderMarkupError(err.message);
  }
};
const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
//window.addEventListener(`hashchange`, controlRecipe);
const controlShopList = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    await model.loadRecipe(id);

    console.log(model.state.recipe);
    shopListView.render(model.state.recipe);
  } catch (error) {}
};
//controlShopList();
const init = function () {
  bookmarkView.addHandler(controlBookmark);
  recipeView._addHandlerRender(controlRecipe);
  shopListView.addHandler(controlShopList);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView._addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();

if (module.hot) {
  module.hot.accept();
}

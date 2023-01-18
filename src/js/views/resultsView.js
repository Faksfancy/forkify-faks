import view from '../views/view.js';
import previewView from './previewView.js';

import icons from '../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector(`.results`);
  _errormessage = `No recipes found for your query. Please try again!`;
  _successmessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(``);
  }
}

export default new ResultView();

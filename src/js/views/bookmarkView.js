import view from '../views/view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class BookmarkView extends view {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errormessage = `No bookmarks yet. Find a nice recipe and bookmark it.`;
  _successmessage = ``;

  addHandler(handler) {
    window.addEventListener(`load`, handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(``);
  }
}

export default new BookmarkView();

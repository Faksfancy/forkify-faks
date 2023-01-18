import view from '../views/view.js';
import icons from '../../img/icons.svg';
import Fraction from 'fractional';

class shoplistView extends view {
  _parentElement = document.querySelector(`.shoplist__list`);

  addHandler(handler) {
    [`hashchange`, `load`].forEach(e => window.addEventListener(e, handler));
  }

  _generateMarkup() {
    return `
      ${this._data.ingredients.map(
        ing => `
        <ul class="shoplist__order">
            <li class="shoplist__detail">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
            </li> 
            ${
              ing.quantity
                ? `<li class="shoplist__detail" > ${new Fraction.Fraction(
                    ing.quantity
                  ).toString()}</li>`
                : ``
            }
            ${ing.unit ? `<li class="shoplist__detail">${ing.unit}</li>` : ``}
            ${
              ing.description
                ? `<li class="shoplist__detail">${ing.description}</span></li>`
                : ``
            }    
        </ul>
        `
      )}
    
    `;
  }
}

export default new shoplistView();

class SearchView {
  #parentEl = document.querySelector(`.search`);

  getQuery() {
    let query = this.#parentEl.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    return (this.#parentEl.querySelector(`.search__field`).value = '');
  }
  _addHandlerSearch(handler) {
    this.#parentEl.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

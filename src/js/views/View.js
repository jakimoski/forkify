import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   * Render data on the DOM
   * @param {Object | Object[]} data Objects that will be rendered
   * @returns
   */
  render(data) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * Detect and then render only the changes in the DOM
   * @param {Object | Object[]} data
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  /**
   * Clear the DOM element inner HTML
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }
  /**
   * Render a spinner in the DOM
   */
  renderSpinner() {
    const markup = `
            <div class="spinner">
               <svg>
                 <use href="${icons}svg#icon-loader"></use>
               </svg>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  /**
   * Renders a error message in the DOM
   * @param {string} message
   */
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders a message in the DOM
   * @param {String} message
   */
  renderMessage(message = this._message) {
    const markup = ` <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

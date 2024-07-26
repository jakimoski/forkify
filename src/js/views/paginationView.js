import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numPages > 1) {
      return this._generateNextBtn(+this._data.page);
    }

    if (this._data.page === numPages && numPages > 1) {
      return this._generatePrevButton(+this._data.page);
    }

    if (this._data.page < numPages) {
      return (
        this._generatePrevButton(+this._data.page) +
        this._generateNextBtn(+this._data.page)
      );
    }

    return '';
  }

  _generatePrevButton(page) {
    return `<button data-goto="${
      page - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>`;
  }
  _generateNextBtn(page) {
    return `<button data-goto="${
      page + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();

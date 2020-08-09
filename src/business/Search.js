import Cart from './Cart'

const SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun article avec ces critères !<br />Tentez une nouvelle recherche."
const SEARCH_SUCCESS = 'Nous avons trouvé %d articles correspondants à vos critères'
const SEARCH_SUCCESS_ONE = 'Nous avons trouvé 1 article correspondant à vos critères'
const SEARCH_STATE_ZERO = true

class Search {
  // constants
  constructor () {
    this._resource = null
    this._results = []
    this._query = ''
    this._widgetClass = 'col-md-4'
    this._resourceURL = 'http://henri-potier.xebia.fr/books'
    this._lostAndFound = document.querySelector('#lostAndFound')
  }

  get results () {
    return this._results
  }

  /**
     * Retrieve the resource and execute a callback function on success if given
     *
     * @param {function} callback
     */
  fetchResource (callback) {
    fetch(this._resourceURL)
      .then(response => response.json())
      .then(data => {
        this._resource = data

        if (typeof callback === 'function') {
          // Trigger callback function on resource found
          callback.call(this)
        }
      })
  }

  /**
     * Retrieve the q field value of the query string
     */
  parseQuery () {
    const url = new URL(window.location.href)

    this._query = url.searchParams.get('q')
  }

  parseInput () {
    this._query = document.querySelector('#searchInput').value
  }

  /**
     *  Try to match the query through the resource on the given field
     *  Set the matching rows in a result array
     *
     *  Returns TRUE if the result array has one key at least otherwise FALSE
     *
     * @param {string} field
     */
  parseResults (field) {
    if (this._resource === null || this._resource === undefined || this._query == '') {
      return false
    }

    const query = this._query.toLowerCase()

    for (const key in this._resource) {
      const row = this._resource[key]

      if (row[field] !== undefined && row[field].toLowerCase().indexOf(query) > -1) {
        this._results.push(row)
      }
    }

    return this._results.length > 0
  }

  /**
     * Loop through the result set and display a template mapped with the current values
     */
  displayResult () {
    for (const key in this._results) {
      const row = this._results[key]
      const title = row.title
      const cover = row.cover
      const price = row.price
      const isbn = row.isbn
      const synopsis = row.synopsis[0].substring(0, 128) + '...'

      const dataset = {}
      dataset.isbn = isbn
      dataset.title = title
      dataset.price = price
      dataset.cover = cover

      const json = encodeURIComponent(JSON.stringify(dataset))

      const widget = document.createElement('div')
      widget.setAttribute('class', this._widgetClass)

      widget.innerHTML =
                `
    <div class="card mb-4 shadow-sm">
        <img src="${cover}" alt="${title}"  width="288" height="424"  preserveAspectRatio="xMidYMid slice" focusable="false" role="img" />
        <div class="card-body">
            <p class="card-text">
            <span class="title" >
            ${title}
            </span>
            <br />
            ${synopsis}
            </p>
            <small>ISBN: ${isbn}</small>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" data-isbn="${isbn}" class="btn btn-sm btn-outline-secondary">Plus</button>
                <button type="button" data-json="${json}" class="add-to-cart-cta btn btn-sm btn-primary btn-success">Ajouter au panier</button>
                </div>
                <h3 class="text-muted">${price} €</h3>
            </div>
        </div>
    </div>
`
      this._lostAndFound.appendChild(widget)
    }
  }

  displayResultState (forceZero = false) {
    const num = this._results.length

    if (num === 0 || forceZero) {
      document.querySelector('#resultState').innerHTML = SEARCH_FAILURE
      document.querySelector('#resetSearch').style.display = 'none'
      return
    }

    let html = SEARCH_SUCCESS_ONE
    if (num > 1) {
      html = `${SEARCH_SUCCESS}`.replace('%d', num)
    }
    document.querySelector('#resultState').innerHTML = html
    document.querySelector('#resetSearch').style.display = 'inline-block'
  }

  /**
     * Clear the search results
     */
  clearSearch () {
    const widgets = this._lostAndFound.querySelectorAll('.' + this._widgetClass)
    const the = this

    widgets.forEach(function (item) {
      the._lostAndFound.removeChild(item)
    })
  }

  // Start the search
  static bootstrap () {
    let search = new Search()
    const criterion = 'title'

    // Get the criterion value from the query string and launch the search
    search.parseQuery()
    search.fetchResource(function () {
      search.parseResults(criterion)
      search.displayResultState()
      search.displayResult()

      Cart.attachEvents()
    })

    document.querySelector('#submitSearchCta').onclick = function () {
      search = new Search()

      // Get the criterion value from the input text box and launch the search
      search.parseInput()
      search.fetchResource(function () {
        search.clearSearch()
        search.parseResults(criterion)
        search.displayResultState()
        search.displayResult()

        Cart.attachEvents()
      })
    }

    document.querySelector('#resetSearch').onclick = function () {
      search = new Search()
      search.clearSearch()
      search.displayResultState(SEARCH_STATE_ZERO)
    }

    setTimeout(function () {
      Cart.printCount()
    }, 200)
  }
}

export default Search

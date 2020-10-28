
class SearchHelper {
  /**
 * Retrieve the q field value of the query string
 */
  static parseQuery () {
    const url = new URL(window.location.href)

    return url.searchParams.get('q')
  }

  /**
     * Retrieve the resource and execute a callback function on success if given
     *
     * @param {function} callback
     */
  static fetchResource (resourceURL, callback) {
    fetch(resourceURL)
      .then(response => response.json())
      .then(data => {
        if (typeof callback === 'function') {
          // Trigger callback function on resource found
          callback.call(this, data)
        }
      }).catch(error => {
        console.error(error)
      })
  }

  /**
     *  Try to match the query through the resource on the given field
     *  Set the matching rows in a result array
     *
     *  Returns TRUE if the result array has one key at least otherwise FALSE
     *
     * @param {string} field
     */
  static parseResults (needle, haystack, field) {
    const results = []

    if (haystack === null || haystack === undefined || needle === '') {
      return false
    }

    needle = needle.toLowerCase()

    for (const key in haystack) {
      const row = haystack[key]

      if (row[field] !== undefined && row[field].toLowerCase().indexOf(needle) > -1) {
        results.push(row)
      }
    }

    return results
  }
}

export default SearchHelper

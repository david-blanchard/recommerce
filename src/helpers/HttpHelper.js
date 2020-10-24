export default class HttpHelper {
  static fullyQualifiedName () {
    const url = new URL(window.location.href)

    return (
      url.protocol +
      '//' +
      url.hostname +
      ((url.protocol === 'http:' && url.port !== 80) ||
      (url.protocol === 'https:' && url.port !== 443)
        ? ':' + url.port
        : '') +
      '/'
    )
  }
}

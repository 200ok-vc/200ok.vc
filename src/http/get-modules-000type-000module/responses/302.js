module.exports = function redirect (location) {
  return {
    statusCode: 302,
    headers: {
      location,
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}

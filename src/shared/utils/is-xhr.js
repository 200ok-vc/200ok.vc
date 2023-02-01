module.exports = function isXHR(req) {
  let contentType = req.headers["Content-Type"] || req.headers["content-type"]
  return /application\/json/gi.test(contentType)
}

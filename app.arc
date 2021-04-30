@app
begin-app

@static
folder public
fingerprint true

@views
src src/views

@http
get /members
get /modules/:type/:module
post /api
get /*

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

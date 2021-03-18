@app
begin-app

@static

@http
post /api

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

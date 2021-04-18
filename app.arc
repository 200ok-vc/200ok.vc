@app
begin-app

@static
folder public
fingerprint true

@views
src src/views

@http
get /*
post /api
post /sendgrid

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

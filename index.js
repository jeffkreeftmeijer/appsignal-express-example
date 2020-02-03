const express = require('express')
const { Appsignal } = require("@appsignal/nodejs")
const { expressMiddleware } = require("@appsignal/express")

const appsignal = new Appsignal({
  active: true,
  name: "appsignal-express-example",
  apiKey: "00000000-0000-0000-0000-000000000000"
})
const app = express()
const port = 3000
const tracer = appsignal.tracer()

app.use(expressMiddleware(appsignal))

app.get('/', function (req, res) {
  const span = tracer.currentSpan()
  const child = span.child("child")

  res.send('Hello World!')

  child.addError(new Error("test error"))
  child.close()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

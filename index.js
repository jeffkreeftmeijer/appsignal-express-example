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

app.use(expressMiddleware(appsignal))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

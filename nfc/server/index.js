const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.port || 8080

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
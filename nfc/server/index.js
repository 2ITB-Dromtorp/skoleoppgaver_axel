const express = require('express')
const app = express()
const cors = require("cors")
const questions = require("./questions")
const port = process.env.port || 8080

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

app.get('/quiz', (req, res) => {
  res.send(JSON.stringify(questions))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
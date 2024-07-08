const express = require('express')
const app = express()
const currencies = require('./routes/currencies')
const PORT = process.env.PORT || 8080
const path = require('path')

//static middleware
app.use(express.static(path.join(__dirname, 'static')))
// @Routes
app.use('/api/currencies', currencies)

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`)
})
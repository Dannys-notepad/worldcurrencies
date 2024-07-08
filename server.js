const express = require('express')
const app = express()
const currencies = require('./routes/currencies')
const PORT = process.env.PORT || 8080

// @Routes
app.use('/api/currencies', currencies)

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`)
})
const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit')
const currencies = require('./routes/currencies')
const path = require('path')

app.set('port', process.env.PORT || 8080)

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10
})

//slmiddlewares
app.use(apiLimiter)
app.use(express.static(path.join(__dirname, 'static')))
// @Routes
app.use('/api/currencies', currencies)

app.listen(app.get('port'), () => {
  console.log(`Server started and running on port ${app.get('port')}`)
})

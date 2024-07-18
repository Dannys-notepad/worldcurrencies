const express = require('express')
const router = express.Router()
const dataB = require('../data/data')
const { checkLimit, searchCurrency } = require('./functions')
const { checkApiKey } = require('../middlewares/postGaurd')

//get all available currencies
router.get('/', (req, res) => {
  res.json(dataB)
})

//get a user specified number of currencies
router.get('/limit/:limit', (req, res) => {
  checkLimit(req, res)
})

//search by abbreviation and fullname
router.get('/search/:word', (req, res) => {
  searchCurrency(req, res)
  //console.log(req.url)
})

router.get('/m', checkApiKey, (req, res) => {
  res.send('hey')
})

module.exports = router
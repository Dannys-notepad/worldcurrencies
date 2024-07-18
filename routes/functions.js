
const currency = require('../data/data')
const js2xmlparser = require('js2xmlparser')

/*
  const xmlCurrencies = `
  <?xml version="1.0" encoding="UTF-8"?>
  <currencies>
    ${currency.map((c) => `
      <currency>
        <id>${c.id}</id>
        <abbrev>${c.abbrev}</abbrev>
        <name>${c.name}</name>
        <symbol>${c.symbol}</symbol>
        <imgurl>${c.imgurl}</imgurl>
      </currency>
    `).join('')}
  </currencies>
`
*/
/*
let currencyTxt = (cur) => {
  const curren = cur.map((c) => {
    return `${c.id} : ${c.name} : ${c.abbrev} :${c.symbol} : ${c.imgurl}`
  }).join('\n')
}
*/

//function for limit
async function checkLimit(req, res){
  /*const resType = req.query.res_type
  console.log(resType)*/
  
  let limit = parseInt(req.params.limit)
  if(!isNaN(limit) && limit > 0 && limit <= currency.length){
    currencyE = currency.slice(0, limit)
    return res.status(200)
              .json(currencyE)
  }else if(limit > currency.length){
    return res.status(400)
              .json({msg: `The limit requested is way too large, number of currencies is ${currency.length}`})
  }else if(isNaN(limit) || limit < 0){
    return res.status(400)
              .json({msg: 'Limit must be a number and greater than zero'})
  }
}

//function for search
async function searchCurrency(req, res){
  let word = req.params.word
  //console.log(word)
  let result = []
  
  if(word.length === 3){
    result = currency.filter(d => d.abbrev === word.toUpperCase())
    if(result.length === 0 ){
      return res.status(404)
                .json({msg:`No currency with abbrevation ${word} was found`})
    }
    return res.json(result)
  }else if(word.length > 3){
    result = currency.filter(d => d.name.replace(/\s+(?!$)/g, '').toUpperCase() === word.toUpperCase())
    if(result.length === 0){
      return res.status(404).json({msg:`The currency ${word} was not found`})
    }
    return res.json(result)
  }
  res.status(404)
     .json({msg:`The searched currency ${word} was not found`})
}

module.exports = {
  checkLimit,
  searchCurrency
}

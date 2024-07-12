
const dataB = require('../data/data')

//function for limit
async function checkLimit(req, res){
  let limit = parseInt(req.params.limit)
  if(!isNaN(limit) && limit > 0 && limit <= dataB.length){
    return res.status(200)
              .json(dataB.slice(0, limit))
  }else if(limit > dataB.length){
    return res.status(400)
              .json({msg: `The limit requested is way too large, number of currencies is ${dataB.length}`})
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
    result = dataB.filter(d => d.currencyabbriviation === word.toUpperCase())
    if(result.length === 0 ){
      return res.status(404)
                .json({msg:`No currency with abbrevation ${word} was found`})
    }
    return res.json(result)
  }else if(word.length > 3){
    result = dataB.filter(d => d.fullmeaning.replace(/\s+(?!$)/g, '').toUpperCase() === word.toUpperCase())
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
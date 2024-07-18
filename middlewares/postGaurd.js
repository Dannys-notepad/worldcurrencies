const checkApiKey = (req, res, next) => {
  const apiKey = 'Dannys-notepad'
  const provideApiKey = req.query.api_key
  if(provideApiKey === apiKey){
    next()
  }else{
    res.status(401).send('Unauthorized')
  }
}

module.exports = {
  checkApiKey
}
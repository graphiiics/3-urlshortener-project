const Short = require('../models/ShortUrl')

module.exports = {
  
  create: (original) => {
    return new Promise((resolve, reject) => {
      Short.create(original)
      .then( data => {
        resolve(data)
      })
      .catch( err => {
        reject(err)
      })
    })
  },
  
  get: (original) => {
    return new Promise((resolve, reject) => {
      Short.findOne(original)
      .select('-_id -__v')
      .exec()
      .then( data => {
        resolve(data)
      })
      .catch( err => {
        reject(err)
      })
    })
  }
}


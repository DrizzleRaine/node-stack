const path = require('path')
const level = require('level')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = level(
  path.join(__dirname, '../../data/thedb')
)

module.exports = function(req, res, next) {
  console.log(req.session)
  next()
}

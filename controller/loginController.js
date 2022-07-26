const user = require('../seeders/user.json')

const login = (req, res, next) => {
  if (req.body.username === user.username) {
    if (req.body.password === user.password) {
      res.redirect('/game')
    }
  }
  res.redirect('/login', )
} 

module.exports = {
  login
}
const router = require('express').Router()
const { User } = require('../db/models')

module.exports = router
//logging in

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    console.log('IS IT CORRECT?:', user.correctPassword('hello'))
    if (!user) {
      res.status(401).send('The user does not exist')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and password combination')
    } else {
      req.login(user, err => err ? next(err) : res.json(user))
    }
  } catch (err) {
    next(err)
  }
})

// logging out
// waiting for passport to be put in

// router.post('/logout', (req,res) =>{
//   req.logout()
//   req.session.destroy()
//   res.redirect('/')
// })



// gettinng current user data (in cookies)
router.get('/me', (req, res) => {
  res.json(req.user)
})

const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

// outputs a list of all users
router.get('/', async (req, res, next) => {
  try {
    users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName'],
      include: [{ all: true }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// outputs a user based on query

router.get('/:userId', (req, res, next) => {
  try {
    user = User.findbyId(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

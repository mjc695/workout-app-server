const router = require('express').Router();

module.exports = router;

router.use('/user', require('./user'));

// router.use('/workouts', require('/workouts'));
// router.use('/sets', require('/sets'));

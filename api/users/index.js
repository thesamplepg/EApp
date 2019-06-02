const router = require('express').Router();
const controllers = require('../../controllers/users');

router.post('/signup', controllers.createUser);
router.post('/signin', controllers.logInUser);

module.exports = router;
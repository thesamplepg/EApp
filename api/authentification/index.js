const router = require("express").Router();
const controllers = require("../../controllers/authentification");

router.post("/signup", controllers.createUser);
router.post("/signin", controllers.logInUser);
router.get("/authorization", controllers.authorization);

module.exports = router;

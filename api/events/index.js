const router = require("express").Router();
const controllers = require("../../controllers/events");

router.post("/event", controllers.createEvent);

module.exports = router;

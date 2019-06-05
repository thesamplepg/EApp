const router = require("express").Router();
const controllers = require("../../controllers/marks");

router.get("/", controllers.getMarks);
router.post("/create", controllers.createMark);

module.exports = router;

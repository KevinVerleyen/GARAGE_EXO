const router = require("express").Router();
const interventionController = require("../controllers/intervention.controller");

router.get("", interventionController.findAll);
router.post("", interventionController.create);
router.get("/:id", interventionController.findOne);
router.put("/:id", interventionController.update);
router.delete("/:id", interventionController.delete);

router.patch("/:id/status", interventionController.updateStatus);

module.exports = router;

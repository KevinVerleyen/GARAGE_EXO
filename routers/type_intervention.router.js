const router = require("express").Router();
const typeInterventionController = require("../controllers/type_intervention.controller");

router.get("", typeInterventionController.findAll);
router.post("", typeInterventionController.create);
router.get("/:id", typeInterventionController.findOne);
router.put("/:id", typeInterventionController.update);
router.delete("/:id", typeInterventionController.delete);

module.exports = router;

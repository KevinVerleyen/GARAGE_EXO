const router = require("express").Router();
const vehiculeController = require("../controllers/vehicule.controller");

router.get("", vehiculeController.findAll);
router.post("", vehiculeController.create);
router.get("/by-type", vehiculeController.findByType);
router.get("/:id", vehiculeController.findOne);
router.put("/:id", vehiculeController.update);
router.delete("/:id", vehiculeController.delete);
router.get("/:id/intervention", vehiculeController.getInterventionHistory);

module.exports = router;

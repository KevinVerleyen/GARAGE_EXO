const router = require("express").Router();
const vehiculeController = require("../controllers/vehicule.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.get("", verifyToken, vehiculeController.findAll);
router.post("", verifyToken, isAdmin, vehiculeController.create);
router.get("/by-type", verifyToken, vehiculeController.findByType);
router.get("/:id", verifyToken, vehiculeController.findOne);
router.put("/:id", verifyToken, vehiculeController.update);
router.delete("/:id", verifyToken, isAdmin, vehiculeController.delete);
router.get(
  "/:id/interventions",
  verifyToken,
  vehiculeController.getInterventionHistory
);

module.exports = router;

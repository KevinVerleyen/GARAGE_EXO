const router = require("express").Router();
const clientController = require("../controllers/client.controller");

// Import du middleware d'auth

// router.route("/").get().post();
// router.route("/:id").get().post().patch()

router.get("", clientController.findAll);
router.post("", clientController.create);
router.get("/:id", clientController.findOne);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.delete);

module.exports = router;

const router = require("express").Router();
const clientController = require("../controllers/client.controller");

// Import du middleware d'auth

// router.route("/").get().post();
// router.route("/:id").get().post().patch()

router.get("", () => {});
router.post("", clientController.create);
router.get("/:id", () => {});
router.put("/:id", () => {});
router.delete("/:id", () => {});

module.exports = router;

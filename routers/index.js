const router = require("express").Router();
const clientRouter = require("./client.router");
const typeInterventionRouter = require("./type_intervention.router");

router.use("/clients", clientRouter);
router.use("/types", typeInterventionRouter);

module.exports = router;

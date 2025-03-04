const router = require("express").Router();
const clientRouter = require("./client.router");

router.use("/clients", clientRouter);

module.exports = router;

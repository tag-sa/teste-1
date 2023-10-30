const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.carregar);
router.put("/:codigo", itemController.atualizar);

module.exports = router;

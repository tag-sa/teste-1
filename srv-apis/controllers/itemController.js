const itemModel = require("../models/itemDoDiaModel");

class ItemController {
  async carregar(req, res) {
    const item = await itemModel.findOne({ codigo: 1 }).populate("produto");
    res.status(200).json(item);
  }

  async atualizar(req, res) {
    const codigo = req.params.codigo;
    const _id = String((await itemModel.findOne({ codigo: codigo }))._id);
    await itemModel.findOneAndUpdate(String(_id), req.body);
    res.status(200).send();
  }
}

module.exports = new ItemController();

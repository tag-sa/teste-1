const mongoose = require("mongoose");

const itemDoDiaSchema = new mongoose.Schema({
  codigo: Number,
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "produto" },
});

module.exports = mongoose.model("itemDoDia", itemDoDiaSchema);

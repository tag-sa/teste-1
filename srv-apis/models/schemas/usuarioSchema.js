const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  codigo: Number,
  perfil: {type: mongoose.Schema.Types.ObjectId, ref: 'perfil'},
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  dtaCriacao: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    select: false
  }
});

usuarioSchema.pre('save', async function(next){
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = usuarioSchema;
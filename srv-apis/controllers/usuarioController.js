const usuarioModel = require('../models/usuarioModel');
const perfilModel = require('../models/perfilModel');
const auth = require('../auth/auth');

class UsuarioController {

  async salvar(req, res){
    const usuario = req.body;
    const max = await usuarioModel.findOne({}).sort({codigo: -1});
    usuario.codigo = max == null ? 1 : max.codigo + 1;
    
    if (await usuarioModel.findOne({'email': usuario.email})){
      res.status(400).send({error: 'Usuário já cadastrado!'});
    }

    const perfil = await perfilModel.findOne({codigo: usuario.perfil.codigo});
    usuario.perfil = perfil._id;
    usuario.token = undefined;

    const resultado = await usuarioModel.create(usuario);
    auth.incluirToken(resultado);
    res.status(201).json(resultado);
  }

  async listar(req, res){
    const resultado = await usuarioModel.find({}).populate('perfil');
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res){
    const codigo = req.params.codigo;
    const resultado = await usuarioModel.findOne({'codigo': codigo}).populate('perfil');
    res.status(200).json(resultado);
  }

  async atualizar(req, res){
    const codigo = req.params.codigo;
    const _id = String((await usuarioModel.findOne({'codigo': codigo}))._id);
    const usuario = await auth.gerarHash(req.body);

    const perfil = await perfilModel.findOne({codigo: usuario.perfil.codigo});
    usuario.perfil = perfil._id;
    usuario.token = undefined;

    await usuarioModel.findByIdAndUpdate(String(_id), usuario);
    res.status(200).send();
  }

  async excluir(req, res){
    const codigo = req.params.codigo;
    const _id = String((await usuarioModel.findOne({'codigo': codigo}))._id);
    await usuarioModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }
}

module.exports = new UsuarioController();
const usuarioModel = require('../models/usuarioModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

  /*
    email: bruno@gmail.com, michael@gmail.com
    senha: Senha123
  */

  async login(req, res){
    const { email, senha } = req.body;
    const usuario = await usuarioModel.findOne({'email': email}).select('+senha').populate('perfil');
    if (!usuario) {
      return res.status(400).send({error: 'Usuário não encontrado!'});
    }

    if (!await bcryptjs.compare(senha, usuario.senha)){
      return res.status(400).send({error: 'Senha inválida!'});
    }

    await auth.incluirToken(usuario);
    res.status(200).json(usuario);
  }
}

module.exports = new LoginController();
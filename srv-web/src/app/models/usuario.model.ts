import { Perfil } from './perfil.model';

export class Usuario {
  codigo: number = 0;
  perfil: Perfil = new Perfil();
  dtaCriacao: Date = new Date();
  nome: string = '';
  email: string = '';
  senha: string = '';
  token: string = '';
}
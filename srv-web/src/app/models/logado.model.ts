import { Cliente } from './../models/cliente.model';

export interface Logado {
  codigo: number,
  email: string,
  senha: string,
  dtaCriacao: string,
  cliente: Cliente
}
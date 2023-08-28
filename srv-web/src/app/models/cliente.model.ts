import { Usuario } from './usuario.model';
import { Loja } from './loja.model';

export class Cliente {
  codigo: number = 0;  
  nome: string = 'Não cadastrado...';
  sobrenome: string= '';
  cpf: string= '';
  usuario: Usuario = new Usuario();
  loja: Loja = new Loja();
  saldoCarteira: number = 0;
  receita: number = 0;
  empresa: string = '';
  fone: string = '';
  endereco: string = '';
  cep: string = '';
  cidade: string = '';
  estado: string = '';
}
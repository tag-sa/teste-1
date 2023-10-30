import { Categoria } from './categoria.model';

export class Produto {
  codigo: number = 0;
  nome: string = '';
  descricao: string = '';
  foto: string = 'semfoto.png';
  image: string = 'semfoto.png';
  categoria: Categoria = new Categoria();
  preco: number = 0;
  peso: number = 0;
  desconto: number = 0;
  pontosDasAvaliacoes: number = 0;
  totalDeAvaliacoes: number = 0;
  disponibilidade: number = 0;
  totalDeCompras: number = 0;
  quantidade: number = 0;
}

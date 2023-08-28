import { Produto } from './produto.model';
import { Cliente } from './cliente.model';
import { Status } from './status.model';

export class Pedido {
  codigo: number = 0;
  data: Date = new Date();
  cliente: Cliente = new Cliente();
  status: Status = new Status();
  itens: Produto[] = [];
  total: number = 0;
}

import { Observable } from 'rxjs/internal/Observable';
import { CarrinhoService, ItemDataSource } from '../../services/carrinho.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente }  from '../../models/cliente.model';
import { Produto } from '../../models/produto.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {

  cliente: Cliente = new Cliente();

  colunas: string[] = [
    'codigo',
    'nome',
    'vlrunitario',
    'subtotal',
    'quantidade',
  ];

  isCarrinhoVazio: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  valorTotalDoPedido: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itensDoCarrinho: ItemDataSource = new ItemDataSource();

  ngOnInit(): void {
    this.itensDoCarrinho = this.carrinhoService.fonteDeDados;
    this.valorTotalDoPedido = this.carrinhoService.valorTotalDoPedido;
    this.isCarrinhoVazio = this.carrinhoService.isCarrinhoVazio;
    if (this.authService.isAutenticado()){
      const codigo = this.authService.usuarioLogado.codigo;
      this.clienteService.buscarPorCodigo(codigo).subscribe((cliente) => {
        this.cliente = cliente;
      });
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private clienteService: ClienteService
  ) {}

  async confirmar() {
    if (this.authService.isAutenticado()) {
      const pedido = new Pedido();
      pedido.cliente = this.cliente;
      pedido.itens = this.carrinhoService.getItens();
      const total = this.carrinhoService.valorTotalDoPedido.value;
      pedido.total = Number(total.toFixed(2));
      this.pedidoService.confirmar(pedido)
        .pipe(catchError((err) => {
          this.router.navigate(['/carrinho/erro']);
            return Observable.throw(err.statusText);
          })
        ).subscribe(() => {
          this.carrinhoService.limpar();
          this.router.navigate(['/carrinho/sucesso']);
        });
      
    } else {
      this.router.navigate(['/login']);
    }
  }

  formatar(valor: BehaviorSubject<number>) {
    const conversor = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return conversor.format(valor.getValue());
  }

  getSubtotal(produto: Produto) {
    return produto.preco * produto.quantidade;
  }

  atualizarItem(produto: Produto) {
    this.carrinhoService.atualizarItem(produto);
  }
}

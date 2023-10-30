import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { ItemService } from 'src/app/services/item.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produto: Produto = { foto: 'semfoto.png' } as Produto;

  URL_SERVIDOR_UPLOAD_FOTO: string = 'http://localhost:3000/fotos/';

  constructor(
    private itemService: ItemService,
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.itemService.carregar().subscribe((item) => {
      item.produto.quantidade = 1;
      this.produto = item.produto;
    });
  }

  atualizarItem(produto: Produto) {
    this.carrinhoService.atualizarItem(produto);
  }
}

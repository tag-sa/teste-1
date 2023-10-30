import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class ItemEditarComponent implements OnInit {
  produtos: Produto[] = [];
  item: Item = new Item();

  URL_SERVIDOR_UPLOAD_FOTO: string = 'http://localhost:3000/fotos/';

  ngOnInit(): void {
    this.itemService.carregar().subscribe((item) => {
      this.item = item;
    });

    this.produtoService.listar().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  constructor(
    private itemService: ItemService,
    private produtoService: ProdutoService
  ) {}

  recarregarItem() {
    this.produtos.forEach((produto) => {
      if (produto.codigo === this.item.produto.codigo) {
        this.item.produto = produto;
      }
    });
  }

  atualizarItem() {
    this.itemService.atualizar(this.item.codigo, this.item).subscribe(() => {
      alert('Item alterado!');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class ProdutoListarComponent implements OnInit {

  produtos: Produto[] = [];
  colunas: string[] = ['codigo', 'nome', 'descricao', 'preco', 'acoes'];

  constructor(private produtoService : ProdutoService) {}

   ngOnInit(): void {
     this.produtoService.listar().subscribe(produtos => {
      this.produtos = produtos;
     });
  }
  
}

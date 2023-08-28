// import { Component, OnInit } from '@angular/core';
// import { Produto } from '../models/produto.model';
// import { CarrinhoService } from '../services/carrinho.service';
// import { ProdutoService } from 'src/app/services/produto.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-produtos',
//   templateUrl: './produtos.component.html',
//   styleUrls: ['./produtos.component.css'],
// })
// export class ProdutosComponent implements OnInit {
//   itensDoCarrinho: Observable<Produto[]> = new Observable<Produto[]>();
//   URL_SERVIDOR_UPLOAD_FOTO: string = 'http://localhost:3000/fotos/';
//   filter: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 20;
//   totalItems: number = 0;
//   constructor(
//     private carrinhoService: CarrinhoService,
//     private produtoService: ProdutoService
//   ) {}

//   ngOnInit(): void {
//     this.itensDoCarrinho = this.produtoService.listar();
//   }

//   adicionarAoCarrinho(produto: Produto) {
//     this.carrinhoService.incrementarUmItem(produto);
//   }

//   filtrarProdutos() {
//     console.log('entrei aqui');
//     console.log(this.filter);

//     this.itensDoCarrinho = this.produtoService
//       .listar()
//       .pipe(
//         map((produtos: Produto[]) =>
//           produtos.filter(
//             (produto: Produto) =>
//               produto.nome.toLowerCase().includes(this.filter.toLowerCase()) ||
//               produto.descricao
//                 .toLowerCase()
//                 .includes(this.filter.toLowerCase())
//           )
//         )
//       );
//   }

//   onPageChange(pageNumber: number) {
//     this.currentPage = pageNumber;
//   }

//   getPaginatedItems(): Observable<Produto[]> {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;

//     return this.itensDoCarrinho.pipe(
//       map((produtos) => produtos.slice(startIndex, endIndex))
//     );
//   }

//   hasNextPage(): boolean {
//     const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
//     return this.currentPage < totalPages;
//   }

//   hasPreviousPage(): boolean {
//     return this.currentPage > 1;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  produtosFiltrados: Produto[] = [];
  produtosExibidos: Produto[] = [];

  URL_SERVIDOR_UPLOAD_FOTO: string = 'http://localhost:3000/fotos/';
  filter: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;

  filtroAtivo: boolean = false; // Adicione essa variável

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe((produtos: Produto[]) => {
      this.produtosFiltrados = produtos;
      this.totalItems = this.produtosFiltrados.length;
      this.atualizarItensExibidos();
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.incrementarUmItem(produto);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.atualizarItensExibidos();
  }

  filtrarPorAtributos() {
    this.filtroAtivo = true;
    this.atualizarItensExibidos();
    this.filterProducts();
    this.filter = '';
  }

  atualizarItensExibidos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.produtosExibidos = this.filtroAtivo
      ? this.filterProducts().slice(startIndex, endIndex)
      : this.produtosFiltrados.slice(startIndex, endIndex);
  }

  filterProducts(): Produto[] {
    return this.produtosFiltrados.filter(
      (produto: Produto) =>
        produto.nome.toLowerCase().includes(this.filter.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  hasNextPage(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return this.currentPage < totalPages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}

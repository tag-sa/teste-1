import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ProdutoExcluirComponent implements OnInit {

  arquivo: File = new File([], '');
  produto : Produto = new Produto();
  categorias: Categoria[] = [];

  URL_SERVIDOR_UPLOAD_FOTO : string = "http://localhost:3000/fotos/";

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(categorias => {
      this.categorias = categorias;
     });
     const str = this.route.snapshot.paramMap.get('codigo');
     this.produtoService.buscarPorCodigo(Number(str)).subscribe((produto) => {
       this.produto = produto;
     });
  }

  constructor(private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  excluir(produto: Produto) {
    this.produtoService.excluir(produto.codigo).subscribe(() =>{
      this.router.navigate(['/cadastros/produtos']);
    });
  }

}
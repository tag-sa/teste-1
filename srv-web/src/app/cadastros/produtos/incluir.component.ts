import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class ProdutoIncluirComponent implements OnInit {
  
  produto : Produto = new Produto()
  arquivo: File = new File([], '');
  categorias: Categoria[] = [];

  URL_SERVIDOR_UPLOAD_FOTO : string = "http://localhost:3000/fotos/";

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(categorias => {
      this.categorias = categorias;
     });
  }

  constructor(private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router) {
      let produto = new Produto();
      this.produto = produto;
    }

  salvarProduto() {
    let nomeDafoto: string = this.produto.foto;
    if (this.arquivo !== null 
      && typeof this.arquivo !== 'undefined'
      && this.arquivo.name !== '') {
      nomeDafoto = Date.now() + "_" + this.arquivo.name;
      this.produtoService.fazerUploadDeImagemNoServidor(this.arquivo, nomeDafoto);
    }
    this.produto.foto = nomeDafoto;
    this.produtoService.salvar(this.produto).subscribe(() => {
      this.router.navigate(['/cadastros/produtos']); 
    });
  }

  selecionarFoto(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    if (input.files 
      && input.files[0] !== null 
      && typeof input.files[0] !== 'undefined'
      && input.files[0].name !== '') {
      this.arquivo = input.files[0];
      this.produto.foto = this.arquivo.name;
    }
  }
}

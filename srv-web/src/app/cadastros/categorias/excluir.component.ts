import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class CategoriaExcluirComponent implements OnInit {

  categoria : Categoria= new Categoria();

  constructor(private service : CategoriaService,
     private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( categoria => {
      this.categoria = categoria;
    });
  }

  excluirCategoria() {
    this.service.excluir(this.categoria.codigo).subscribe(() =>{
      this.router.navigate(['/cadastros/categorias']);
    });
  }

}
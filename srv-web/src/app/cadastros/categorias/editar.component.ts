import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  categoria : Categoria = new Categoria();

  constructor(private service : CategoriaService,
      private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( categoria => {
      this.categoria = categoria;
    });
  }

  atualizarCategoria() {
    this.service.atualizar(this.categoria.codigo, this.categoria).subscribe(() => {
      this.router.navigate(['/cadastros/categorias']);
    });
  }
}

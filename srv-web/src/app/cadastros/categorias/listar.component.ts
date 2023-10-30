import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class CategoriaListarComponent implements OnInit {

  categorias: Categoria[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'descricao', 'acoes'];

  constructor(private service : CategoriaService) {}

   ngOnInit(): void {
     this.service.listar().subscribe(categorias => {
      this.categorias = categorias;
     });
  }
  
}

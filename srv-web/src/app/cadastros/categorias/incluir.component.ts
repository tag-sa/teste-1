import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class CategoriaIncluirComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
  categoria : Categoria = new Categoria();

  constructor(private service: CategoriaService,
     private router: Router) {}

  salvarCategoria() {
    this.service.salvar(this.categoria).subscribe(() => {
      this.router.navigate(['/cadastros/categorias']); 
    });
  }

}

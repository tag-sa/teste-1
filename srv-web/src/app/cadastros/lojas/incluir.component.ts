import { Loja } from 'src/app/models/loja.model';
import { Component, OnInit } from '@angular/core';
import { LojaService } from 'src/app/services/loja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class LojaIncluirComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
  loja : Loja = {} as Loja;

  constructor(private service: LojaService,
     private router: Router) {}

  salvarLoja() {
    this.service.salvar(this.loja).subscribe(() => {
      this.router.navigate(['/cadastros/lojas']); 
    });
  }

}
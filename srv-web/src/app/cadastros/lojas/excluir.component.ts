import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from 'src/app/services/loja.service';
import { Loja } from 'src/app/models/loja.model';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class LojaExcluirComponent implements OnInit {

  loja : Loja = {} as Loja;

  constructor(private service : LojaService,
     private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( loja => {
      this.loja = loja;
    });
  }

  excluirLoja() {
    this.service.excluir(this.loja.codigo).subscribe(() =>{
      this.router.navigate(['/cadastros/lojas']);
    });
  }

}
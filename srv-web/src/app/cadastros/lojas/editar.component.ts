import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from 'src/app/services/loja.service';
import { Loja } from 'src/app/models/loja.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class LojaEditarComponent implements OnInit {

  loja : Loja = {} as Loja;

  constructor(private service : LojaService,
      private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( loja => {
      this.loja = loja;
    });
  }

  atualizarLoja() {
    this.service.atualizar(this.loja.codigo, this.loja).subscribe(() => {
      this.router.navigate(['/cadastros/lojas']);
    });
  }
}

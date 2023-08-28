import { Component, OnInit } from '@angular/core';
import { LojaService } from 'src/app/services/loja.service';
import { Loja } from 'src/app/models/loja.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class LojaListarComponent implements OnInit {

  lojas : Loja[] = [];

  displayedColumns: string[] = ['codigo', 'nome', 'acoes'];

  constructor(private lojaService : LojaService) {}

   ngOnInit(): void {
     this.lojaService.listar().subscribe(lojas => {
      this.lojas = lojas;
     });
  }
}
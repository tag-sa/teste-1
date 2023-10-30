import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class ClienteListarComponent implements OnInit {

  clientes: Cliente[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'sobrenome', 'cpf', 'receita', 'acoes'];

  constructor(private service : ClienteService) { }

   ngOnInit(): void {
     this.service.listar().subscribe(clientes => {
      this.clientes = clientes;
     });
  }
  
}
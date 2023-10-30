import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LojaService } from 'src/app/services/loja.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Loja } from 'src/app/models/loja.model';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class ClienteIncluirComponent implements OnInit {
  
  lojas: Loja[] = [];
  usuarios: Usuario[] = [];
  cliente : Cliente = new Cliente();

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
     });
    this.lojaService.listar().subscribe(lojas => {
      this.lojas = lojas;
     });
  }

  constructor(private usuarioService: UsuarioService,
     private lojaService: LojaService, 
     private clienteService: ClienteService,
     private router: Router) {}

  salvarCliente() {
    this.clienteService.salvar(this.cliente).subscribe(() => {
      this.router.navigate(['/cadastros/clientes']); 
    });
  }

}

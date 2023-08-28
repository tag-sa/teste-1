import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class UsuarioListarComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'email', 'acoes'];

  constructor(private service : UsuarioService) { }

   ngOnInit(): void {
     this.service.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
     });
  }
  
}
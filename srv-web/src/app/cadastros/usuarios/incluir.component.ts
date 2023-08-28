import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class UsuarioIncluirComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
  usuario : Usuario = new Usuario();

  constructor(private service: UsuarioService,
     private router: Router) {}

  salvarUsuario() {
    this.service.salvar(this.usuario).subscribe(() => {
      this.router.navigate(['/cadastros/usuarios']); 
    });
  }
}

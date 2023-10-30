import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class UsuarioExcluirComponent implements OnInit {

  usuario : Usuario = new Usuario();

  constructor(private service : UsuarioService,
     private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( usuario => {
      this.usuario = usuario;
    });
  }

  excluirUsuario() {
    this.service.excluir(this.usuario.codigo).subscribe(() =>{
      this.router.navigate(['/cadastros/usuarios']);
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LojaService } from 'src/app/services/loja.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Loja } from 'src/app/models/loja.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class ClienteEditarComponent implements OnInit {
  
  lojas: Loja[] = [];
  usuarios: Usuario[] = [];
  cliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });

    this.lojaService.listar().subscribe((lojas) => {
      this.lojas = lojas;
    });

    const str = this.route.snapshot.paramMap.get('codigo');
    this.clienteService.buscarPorCodigo(Number(str)).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  constructor(
    private usuarioService: UsuarioService,
    private lojaService: LojaService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  atualizarCliente() {
    this.clienteService
      .atualizar(this.cliente.codigo, this.cliente)
      .subscribe(() => {
        this.router.navigate(['/cadastros/clientes']);
      });
  }
}

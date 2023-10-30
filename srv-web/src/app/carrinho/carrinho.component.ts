import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {

  cliente : Cliente = new Cliente();

  constructor(private authService: AuthService,
              private clienteService: ClienteService){}
  ngOnInit(): void {
    if (this.authService.isAutenticado()){
      const codigo = this.authService.usuarioLogado.codigo;
      this.clienteService.buscarPorCodigo(codigo).subscribe((cliente) => {
        this.cliente = cliente;
      });
    }
  }
}
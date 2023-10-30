import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pedido } from '../models/pedido.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  URL_CADASTRO = "http://localhost:3000/pedidos";

  listar() : Observable<Pedido[]> {
    let response = this.http.get<Pedido[]>(this.URL_CADASTRO);
    return response;
  }

  buscarPorCodigo(codigo : number) : Observable<Pedido> {
    const path = `${this.URL_CADASTRO}/${codigo}`;
    return this.http.get<Pedido>(path);
  }

  confirmar(pedido : Pedido) : Observable<Pedido> {
    let headers = new HttpHeaders();
    if (this.authService.isAutenticado()){
      headers = headers.set('Authorization', `Bearer ${this.authService.usuarioLogado.token}`);
    }
    return this.http.post<Pedido>(this.URL_CADASTRO, pedido, {headers: headers});
  }

  atualizar(pedido : Pedido) : Observable<Pedido> {
    const path = `${this.URL_CADASTRO}/${pedido.codigo}`;
    return this.http.put<Pedido>(path, pedido);
  }

  excluir(codigo? : number) : Observable<Pedido> {
    const path = `${this.URL_CADASTRO}/${codigo}`;
    return this.http.delete<Pedido>(path);
  }
}
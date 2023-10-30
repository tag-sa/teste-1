import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  URL_CADASTRO = 'http://localhost:3000/produtos';
  URL_UPLOAD = 'http://localhost:3000/upload';

  listar(): Observable<Produto[]> {
    let response = this.http.get<Produto[]>(this.URL_CADASTRO);
    return response;
  }

  buscarPorCodigo(codigo: number): Observable<Produto> {
    const path = `${this.URL_CADASTRO}/${codigo}`;
    return this.http.get<Produto>(path);
  }

  fazerUploadDeImagemNoServidor(arquivo: File, nomeDaFoto: string) {
    const formData = new FormData();
    formData.append('arquivo', arquivo, nomeDaFoto);
    const upload = this.http.post(this.URL_UPLOAD, formData);
    upload.subscribe();
  }

  salvar(produto: Produto): Observable<any> {
    return this.http.post<Produto>(this.URL_CADASTRO, produto);
  }

  atualizar(produto: Produto): Observable<any> {
    const path = `${this.URL_CADASTRO}/${produto.codigo}`;
    return this.http.put<Produto>(path, produto);
  }

  excluir(codigo?: number): Observable<any> {
    const path = `${this.URL_CADASTRO}/${codigo}`;
    return this.http.delete<Produto>(path);
  }
}

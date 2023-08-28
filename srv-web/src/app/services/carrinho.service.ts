import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { DataSource } from '@angular/cdk/collections';
import { Subject, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private _mapItens = new Map<number, Produto>();
  private _itens: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>([]);
  public itens = this._itens.asObservable();
  public fonteDeDados = new ItemDataSource();

  private _totalDeItens: number = 0;
  private _totalDeItensNoCarrinho: Subject<number> = new Subject<number>();
  public totalDeItensNoCarrinho = this._totalDeItensNoCarrinho.asObservable();

  private _valorTotal: number = 0;
  public valorTotalDoPedido: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public isCarrinhoVazio: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private atualizarDados(){
    this._itens.next([...this._mapItens.values()]);
    this.fonteDeDados.atualizar([...this._mapItens.values()]);
    this.atualizarTotalDeItens([...this._mapItens.values()]);
  }

  public getItens(){
    return [...this._mapItens.values()];
  }

  public limpar(){
    this._mapItens = new Map<number, Produto>();
    this.atualizarDados();
  }

  private atualizarTotalDeItens(itens: Produto[]) {
   
    this._totalDeItens = 0;
    this._valorTotal = 0;
   
    for (const item of itens) {
      this._totalDeItens += item.quantidade;
      this._valorTotal += (item.preco * item.quantidade);
    }

    if (this._totalDeItens < 1){
      this.isCarrinhoVazio.next(true);
    } else {
      this.isCarrinhoVazio.next(false);
    }

    this._totalDeItensNoCarrinho.next(this._totalDeItens);
    this.valorTotalDoPedido.next(this._valorTotal);
  }

  atualizarItem(produto: Produto) {
    const item = this._mapItens.get(produto.codigo);
    if (produto.quantidade < 1){
      this.removerItem(produto)
    } else {
      this._mapItens.set(produto.codigo, produto);
      this.atualizarDados();
    }
  }

  incrementarUmItem(produto: Produto) {
    const item = this._mapItens.get(produto.codigo);
    if (item) {
      produto.quantidade = item.quantidade ? item.quantidade + 1 : 1;
    }
    if (typeof produto.quantidade === 'undefined'){
      produto.quantidade = 1;
    }
    this._mapItens.set(produto.codigo, produto);
    this.atualizarDados();
  }

  removerItem(produto: Produto) {
    const item = this._mapItens.get(produto.codigo);
    if (item) {
      this._mapItens.delete(produto.codigo);
      this.atualizarDados();
    }
  }
}

export class ItemDataSource extends DataSource<Produto> {

  private _streamDeDados = new ReplaySubject<Produto[]>();

  connect(): Observable<Produto[]> {
    return this._streamDeDados;
  }

  atualizar(dados: Produto[]) {
    this._streamDeDados.next(dados);
  }
  
  disconnect() {}
}

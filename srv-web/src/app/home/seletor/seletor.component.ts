import { Component, Input, AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-seletor-home',
  templateUrl: './seletor.component.html',
  styleUrls: ['./seletor.component.css']
})
export class SeletorHomeComponent {

  @Input() produto : Produto = {} as Produto;
  @Output() eventoAtualizar: EventEmitter<Produto> = new EventEmitter();

  private getQuantidade(event: any): number {
    return parseInt(event.target.value);
  }

  adicionarAoCarrinho(){
    this.eventoAtualizar.emit(this.produto);
  }

  adicionarItem(){
    this.produto.quantidade++;
  }

  atualizarItem(event: any){
    if (this.getQuantidade(event) > 0){
      this.produto.quantidade = this.getQuantidade(event);
      this.eventoAtualizar.emit(this.produto);
    } 
  }

  removerItem(){
    if (this.produto.quantidade > 1){
      this.produto.quantidade--;
    } 
  }
}

import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-seletor-carrinho',
  templateUrl: './seletor.component.html',
  styleUrls: ['./seletor.component.css']
})
export class SeletorCarrinhoComponent {

  @Input() produto : Produto = {} as Produto;
  @Output() eventoAtualizar: EventEmitter<Produto> = new EventEmitter();

  adicionarItem(){
    this.produto.quantidade++;
    this.eventoAtualizar.emit(this.produto);
  }

  removerItem(){
    if (this.produto.quantidade > 0){
      this.produto.quantidade--;
      this.eventoAtualizar.emit(this.produto);
    } 
  }
}
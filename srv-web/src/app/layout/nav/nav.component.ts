import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() itensQtde: number = 0;

  constructor(private carrinhoService: CarrinhoService,
     public authService: AuthService){
  }

  ngOnInit(): void {
    this.carrinhoService.totalDeItensNoCarrinho.subscribe((total) => {
      this.itensQtde = total;
    });
  }

  logout(){
    this.authService.logout();
  }
}

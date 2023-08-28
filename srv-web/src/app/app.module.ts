import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Pipes
import { FormatoRealPipe } from './formato-real.pipe';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { SobreComponent } from './sobre/sobre.component';
import { BarraComponent } from './cadastros/barra/barra.component';
import { SeletorHomeComponent } from './home/seletor/seletor.component';
import { ItemEditarComponent } from './cadastros/item/editar.component';
import { SeletorCarrinhoComponent } from './carrinho/seletor/seletor.component';
import { CategoriaListarComponent } from './cadastros/categorias/listar.component';
import { CategoriaIncluirComponent } from './cadastros/categorias/incluir.component';
import { CategoriaEditarComponent } from './cadastros/categorias/editar.component';
import { CategoriaExcluirComponent } from './cadastros/categorias/excluir.component';
import { ClienteListarComponent } from './cadastros/clientes/listar.component';
import { ClienteIncluirComponent } from './cadastros/clientes/incluir.component';
import { ClienteExcluirComponent } from './cadastros/clientes/excluir.component';
import { ClienteEditarComponent } from './cadastros/clientes/editar.component';
import { UsuarioListarComponent } from './cadastros/usuarios/listar.component';
import { UsuarioIncluirComponent } from './cadastros/usuarios/incluir.component';
import { UsuarioExcluirComponent } from './cadastros/usuarios/excluir.component';
import { UsuarioEditarComponent } from './cadastros/usuarios/editar.component';
import { PedidoEditarComponent } from './cadastros/pedidos/editar.component';
import { PedidoListarComponent } from './cadastros/pedidos/listar.component';
import { ProdutoListarComponent } from './cadastros/produtos/listar.component';
import { ProdutoIncluirComponent } from './cadastros/produtos/incluir.component';
import { ProdutoEditarComponent } from './cadastros/produtos/editar.component';
import { ProdutoExcluirComponent } from './cadastros/produtos/excluir.component';
import { StatusListarComponent } from './cadastros/status/listar.component';
import { StatusIncluirComponent } from './cadastros/status/incluir.component';
import { StatusEditarComponent } from './cadastros/status/editar.component';
import { StatusExcluirComponent } from './cadastros/status/excluir.component';
import { SucessoComponent } from './carrinho/sucesso/sucesso.component';
import { PedidoComponent } from './carrinho/pedido/pedido.component';
import { LojaListarComponent } from './cadastros/lojas/listar.component';
import { LojaIncluirComponent } from './cadastros/lojas/incluir.component';
import { LojaEditarComponent } from './cadastros/lojas/editar.component';
import { LojaExcluirComponent } from './cadastros/lojas/excluir.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { MeusPedidosComponent } from './cadastros/clientes/meuspedidos/meuspedidos.component';
import { ErroComponent } from './carrinho/erro/erro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    ProdutosComponent,
    CarrinhoComponent,
    CadastrosComponent,
    SobreComponent,
    BarraComponent,
    FormatoRealPipe,
    SeletorHomeComponent,
    SeletorCarrinhoComponent,
    CategoriaListarComponent,
    CategoriaIncluirComponent,
    CategoriaExcluirComponent,
    CategoriaEditarComponent,
    ClienteListarComponent,
    ClienteIncluirComponent,
    ClienteExcluirComponent,
    ClienteEditarComponent,
    UsuarioListarComponent,
    UsuarioIncluirComponent,
    UsuarioExcluirComponent,
    UsuarioEditarComponent,
    PedidoEditarComponent,
    PedidoListarComponent,
    ItemEditarComponent,
    ProdutoListarComponent,
    ProdutoEditarComponent,
    ProdutoIncluirComponent,
    ProdutoExcluirComponent,
    StatusListarComponent,
    StatusEditarComponent,
    StatusIncluirComponent,
    StatusExcluirComponent,
    LojaListarComponent,
    LojaEditarComponent,
    LojaIncluirComponent,
    LojaExcluirComponent,
    SucessoComponent,
    PedidoComponent,
    LoginComponent,
    RegistrarComponent,
    MeusPedidosComponent,
    ErroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { MeusPedidosComponent } from './cadastros/clientes/meuspedidos/meuspedidos.component';
import { CategoriaListarComponent } from './cadastros/categorias/listar.component';
import { CategoriaIncluirComponent } from './cadastros/categorias/incluir.component';
import { CategoriaEditarComponent } from './cadastros/categorias/editar.component';
import { CategoriaExcluirComponent } from './cadastros/categorias/excluir.component';
import { ClienteListarComponent } from './cadastros/clientes/listar.component';
import { ClienteIncluirComponent } from './cadastros/clientes/incluir.component';
import { ClienteEditarComponent } from './cadastros/clientes/editar.component';
import { ClienteExcluirComponent } from './cadastros/clientes/excluir.component';
import { UsuarioListarComponent } from './cadastros/usuarios/listar.component';
import { UsuarioIncluirComponent } from './cadastros/usuarios/incluir.component';
import { UsuarioEditarComponent } from './cadastros/usuarios/editar.component';
import { UsuarioExcluirComponent } from './cadastros/usuarios/excluir.component';
import { PedidoListarComponent } from './cadastros/pedidos/listar.component';
import { PedidoEditarComponent } from './cadastros/pedidos/editar.component';
import { ItemEditarComponent } from './cadastros/item/editar.component';
import { ProdutoListarComponent } from './cadastros/produtos/listar.component';
import { ProdutoIncluirComponent } from './cadastros/produtos/incluir.component';
import { ProdutoEditarComponent } from './cadastros/produtos/editar.component';
import { ProdutoExcluirComponent } from './cadastros/produtos/excluir.component';
import { StatusListarComponent } from './cadastros/status/listar.component';
import { StatusIncluirComponent } from './cadastros/status/incluir.component';
import { StatusEditarComponent } from './cadastros/status/editar.component';
import { StatusExcluirComponent } from './cadastros/status/excluir.component';
import { SucessoComponent } from './carrinho/sucesso/sucesso.component';
import { ErroComponent } from './carrinho/erro/erro.component';
import { LojaListarComponent } from './cadastros/lojas/listar.component';
import { LojaIncluirComponent } from './cadastros/lojas/incluir.component';
import { LojaEditarComponent } from './cadastros/lojas/editar.component';
import { LojaExcluirComponent } from './cadastros/lojas/excluir.component';
import { PedidoComponent } from './carrinho/pedido/pedido.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AuthService as AuthGuard } from './services/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'sobre', component: SobreComponent },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
    children: [
      { path: '', component: PedidoComponent },
      { path: 'sucesso', component: SucessoComponent },
      { path: 'erro', component: ErroComponent },
    ],
  },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'meuspedidos', component: MeusPedidosComponent },
  {
    path: 'cadastros',
    component: CadastrosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ItemEditarComponent },
      { path: 'produtos', component: ProdutoListarComponent },
      { path: 'produtos/incluir', component: ProdutoIncluirComponent },
      { path: 'produtos/editar/:codigo', component: ProdutoEditarComponent },
      { path: 'produtos/excluir/:codigo', component: ProdutoExcluirComponent },
      { path: 'clientes', component: ClienteListarComponent },
      { path: 'clientes/incluir', component: ClienteIncluirComponent },
      { path: 'clientes/editar/:codigo', component: ClienteEditarComponent },
      { path: 'clientes/excluir/:codigo', component: ClienteExcluirComponent },
      { path: 'usuarios', component: UsuarioListarComponent },
      { path: 'usuarios/incluir', component: UsuarioIncluirComponent },
      { path: 'usuarios/editar/:codigo', component: UsuarioEditarComponent },
      { path: 'usuarios/excluir/:codigo', component: UsuarioExcluirComponent },
      { path: 'pedidos', component: PedidoListarComponent },
      { path: 'pedidos/editar/:codigo', component: PedidoEditarComponent },
      { path: 'categorias', component: CategoriaListarComponent },
      { path: 'categorias/incluir', component: CategoriaIncluirComponent },
      {
        path: 'categorias/editar/:codigo',
        component: CategoriaEditarComponent,
      },
      {
        path: 'categorias/excluir/:codigo',
        component: CategoriaExcluirComponent,
      },
      { path: 'status', component: StatusListarComponent },
      { path: 'status/incluir', component: StatusIncluirComponent },
      { path: 'status/editar/:codigo', component: StatusEditarComponent },
      { path: 'status/excluir/:codigo', component: StatusExcluirComponent },
      { path: 'lojas', component: LojaListarComponent },
      { path: 'lojas/incluir', component: LojaIncluirComponent },
      { path: 'lojas/editar/:codigo', component: LojaEditarComponent },
      { path: 'lojas/excluir/:codigo', component: LojaExcluirComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

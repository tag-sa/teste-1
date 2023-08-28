import { GenericCRUDService } from './generic.crud.service';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericCRUDService<Usuario> {

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/usuarios");
   }
}
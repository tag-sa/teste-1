import { GenericCRUDService } from './generic.crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericCRUDService<Categoria> {

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/categorias");
   }
}
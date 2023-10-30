import { GenericCRUDService } from './generic.crud.service';
import { HttpClient } from '@angular/common/http';
import { Loja } from '../models/loja.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LojaService extends GenericCRUDService<Loja> {

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/lojas");
   }
}
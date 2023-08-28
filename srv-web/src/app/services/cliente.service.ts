import { GenericCRUDService } from './generic.crud.service';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericCRUDService<Cliente> {

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/clientes");
   }
}
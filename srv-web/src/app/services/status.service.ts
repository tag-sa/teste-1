import { GenericCRUDService } from './generic.crud.service';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/status.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends GenericCRUDService<Status> {

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/status");
   }
}
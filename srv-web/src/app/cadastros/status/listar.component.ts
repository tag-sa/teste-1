import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})  
export class StatusListarComponent implements OnInit {

  status: Status[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'acoes'];

  constructor(private service : StatusService) {}

   ngOnInit(): void {
     this.service.listar().subscribe(status => {
      this.status = status;
     });
  }
}
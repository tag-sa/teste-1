import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class StatusIncluirComponent implements OnInit {
  
  ngOnInit(): void {
  }
  
  status : Status = {} as Status;

  constructor(private service: StatusService,
     private router: Router) {}

  salvarStatus() {
    this.service.salvar(this.status).subscribe(() => {
      this.router.navigate(['/cadastros/status']); 
    });
  }

}
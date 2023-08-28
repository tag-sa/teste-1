import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class StatusExcluirComponent implements OnInit {


  status : Status = {} as Status;

  constructor(private service : StatusService,
     private router : Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( status => {
      this.status = status;
    });
  }

  excluirStatus() {
    this.service.excluir(this.status.codigo).subscribe(() =>{
      this.router.navigate(['/cadastros/status']);
    });
  }

}
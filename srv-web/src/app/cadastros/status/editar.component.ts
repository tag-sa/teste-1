import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class StatusEditarComponent implements OnInit {

  status : Status = {} as Status;

  constructor(private service : StatusService,
      private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const str = this.route.snapshot.paramMap.get('codigo');
    this.service.buscarPorCodigo(Number(str)).subscribe( status => {
      this.status = status;
    });
  }

  atualizarStatus() {
    this.service.atualizar(this.status.codigo, this.status).subscribe(() => {
      this.router.navigate(['/cadastros/status']);
    });
  }
}

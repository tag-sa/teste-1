import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isInvalido = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      senha: this.fb.control('', [Validators.required])
     });
  }

  logar(){
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.senha)
      .pipe(catchError(error =>{
        this.isInvalido = true;
        return Observable.throw(error);
      }))
    .subscribe(() => {
      this.isInvalido = false;
      this.location.back();
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  errorstring: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authservice: AuthService) {

    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  formSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.username !== 'fingent' || this.loginForm.value.password !== 'fingent') {
      this.errorstring = 'incorrect username or password';
      return;
    }
    sessionStorage.setItem('username', this.loginForm.value.username);
    this.authservice.updateSubject(this.loginForm.value.username)
    this.router.navigate(['/dashboard']);

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  minDate = new Date(1900, 1, 1);
  maxDate = new Date();
  displayError = false;
  displayLoading = false;

  registerForm = this._lf.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    gender: [''],
    dob: [''],
    mobilePhone: [''],
    password: [''],
    rePassword: [''],
  });

  constructor(
    private _lf: FormBuilder,
    private _backend: UserService,
    private _router: Router,
    private _userserivce: UserService
  ) {}

  public isvalidPhone(n: string): boolean {
    if (n.length == 10) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
    return false;
  }

  submit(): void {
    this.displayLoading = true;

    if (this.isvalidPhone(this.registerForm.value.mobilePhone)) {
      if (
        this.registerForm.value.password == this.registerForm.value.rePassword
      ) {
        this._backend
          .register(
            this.registerForm.value.email,
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.gender,
            this.registerForm.value.dob,
            this.registerForm.value.mobilePhone,
            this.registerForm.value.password
          )
          .subscribe({
            next: (_result) => {
              this._router.navigateByUrl('login');
              this.displayLoading = false;
              this._userserivce.showSuccessAlert('Registration Successful');
            },
            error: (err) => {
              this.displayError = true;
              this.displayLoading = false;
              this._userserivce.showErrorAlert(err.error.error.description);
            },
          });
      } else {
        this._userserivce.showErrorAlert('Confirm Password must match');
        this.displayLoading = false;
      }
    } else {
      this._userserivce.showErrorAlert('Enter valid Phone Number (10 digit)');
      this.displayLoading = false;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('JwtToken') != null) {
      this._router.navigateByUrl('home');
    }

    this.registerForm.valueChanges.subscribe((_value) => {
      this.displayError = false;
    });
  }
}

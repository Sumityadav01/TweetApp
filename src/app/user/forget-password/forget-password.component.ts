import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  minDate = new Date(1900, 1, 1);
  maxDate = new Date();

  displayError = false;
  displayLoading = false;

  ForgotPasswordForm = this._lf.group({
    email: [''],
    dob: [''],
    mobilePhone: [''],
    newPassword: [''],
    rePassword: [''],
  });

  submit(): void {
    this.displayLoading = true;

    if (
      this.ForgotPasswordForm.value.newPassword ==
      this.ForgotPasswordForm.value.rePassword
    ) {
      this._userservice
        .forgotPassword(
          this.ForgotPasswordForm.value.email,
          this.ForgotPasswordForm.value.dob,
          this.ForgotPasswordForm.value.mobilePhone,
          this.ForgotPasswordForm.value.newPassword
        )
        .subscribe({
          next: (_result) => {
            this._router.navigateByUrl('login');
            this.displayLoading = false;
            this._userservice.showSuccessAlert('Password Reset Successful');
          },
          error: (error) => {
            this.displayError = true;
            this.displayLoading = false;
            this._userservice.showErrorAlert(error.error.error.description);
          },
        });
    } else {
      this._userservice.showErrorAlert('Confirm Password must match');
      this.displayLoading = false;
    }
  }

  constructor(
    private _lf: FormBuilder,
    private _userservice: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('JwtToken') != null) {
      this._router.navigateByUrl('home');
    }

    this.ForgotPasswordForm.valueChanges.subscribe((_value) => {
      this.displayError = false;
    });
  }
}

import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public _userservice: UserService, private _router: Router) {}

  onLogout(): void {
    this._userservice.logout().subscribe({
      next: (_result: any) => {
        this._router.navigateByUrl('login');
        localStorage.clear();
        this._userservice.updateIsLoggedIn(false);
      },
      error: (_err: any) => {
        localStorage.clear();
        this._userservice.showErrorAlert(
          'Error Occured - please login and log out again!'
        );
      },
    });
  }
}

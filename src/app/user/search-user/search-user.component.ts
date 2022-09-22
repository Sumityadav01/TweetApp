import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  displayLoading = false;
  noUser = false;
  public users: any;

  constructor(public _userService: UserService) {}

  search(name: string): void {
    this.displayLoading = true;

    this._userService.searchUser(name).subscribe({
      next: (result: any) => {
        this.displayLoading = false;
        this.users = result;
      },
      error: (error: any) => {
        this.displayLoading = false;
        this._userService.showErrorAlert(error.error.error.description);
      },
    });
  }

  isSearchButtonEnabled(name: string): boolean {
    if (name?.length > 0) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {}
}

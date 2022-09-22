import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  username: string = '';
  gender: string = '';

  isViewAllTweet = true;
  isViewMyTweet = false;
  isViewAllUser = false;
  isSearchUser = false;

  constructor(private _router: Router) {}

  onIsviewALLTweet(): void {
    this.isViewAllTweet = true;
    this.isViewMyTweet = false;
    this.isViewAllUser = false;
    this.isSearchUser = false;
  }

  onIsviewMyTweet(): void {
    this.isViewAllTweet = false;
    this.isViewMyTweet = true;
    this.isViewAllUser = false;
    this.isSearchUser = false;
  }

  onIsviewALLuser(): void {
    this.isViewAllTweet = false;
    this.isViewMyTweet = false;
    this.isViewAllUser = true;
    this.isSearchUser = false;
  }

  onIsSearchUser(): void {
    this.isViewAllTweet = false;
    this.isViewMyTweet = false;
    this.isViewAllUser = false;
    this.isSearchUser = true;
  }

  ngOnInit(): void {
    if (localStorage.getItem('JwtToken') != null) {
      this._router.navigateByUrl('home');
    } else {
      this._router.navigateByUrl('login');
    }

    if (localStorage.getItem('name') != null) {
      this.username = localStorage.getItem('name') || 'error';
    }
    if (localStorage.getItem('gender') != null) {
      this.gender = localStorage.getItem('gender') || 'M';
    }
  }
}

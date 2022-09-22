import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from 'src/app/service/tweet.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.scss'],
})
export class PostTweetComponent implements OnInit {
  tweetPostForm = this._lf.group({
    message: [''],
    tag: [''],
  });
  displayError = false;
  displayLoading = false;
  isShowPostSuccess = false;

  constructor(
    private _lf: FormBuilder,
    public _tweetService: TweetService,
    public _userservice: UserService,
    private _router: Router
  ) {}

  newPost(): void {
    this.isShowPostSuccess = false;
  }

  newPostcancal(): void {
    this.displayError = false;
    this.isShowPostSuccess = false;
  }

  submit(): void {
    this.displayLoading = true;
    this._tweetService
      .PostTweet(this.tweetPostForm.value.message, this.tweetPostForm.value.tag)
      .subscribe({
        next: async (_result: any) => {
          this.displayLoading = false;
          this.isShowPostSuccess = true;
          this._userservice.updateIsReloadTweet(true);
          await new Promise((f) => setTimeout(f, 1000));
          this._router.navigateByUrl('login');
        },
        error: (err: any) => {
          this.displayError = true;
          this.displayLoading = false;
          this._userservice.showErrorAlert(err.error.error.description);
        },
      });
  }

  ngOnInit(): void {
    this.tweetPostForm.valueChanges.subscribe((_value) => {
      this.displayError = false;
    });
  }
}

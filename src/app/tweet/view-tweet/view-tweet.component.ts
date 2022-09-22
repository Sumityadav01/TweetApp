import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TweetService } from 'src/app/service/tweet.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tweet',
  templateUrl: './view-tweet.component.html',
  styleUrls: ['./view-tweet.component.scss'],
})
export class ViewTweetComponent implements OnInit {
  gender: string = '';
  tweetEditForm = this._lf.group({
    message: [''],
    tag: [''],
  });

  displayError = false;
  displayLoading = false;
  isShowEditSuccess = false;
  fetchDone = false;

  public tweets: any[] = [];
  public replies: any[] = [];
  public msg: any;
  public tag: any;
  tweetService: TweetService;
  userservice: UserService;

  constructor(
    public _tweetService: TweetService,
    private _lf: FormBuilder,
    public _userservice: UserService
  ) {
    this.tweetService = _tweetService;
    this.userservice = _userservice;
  }

  reloadTweet(): void {
    if (localStorage.getItem('JwtToken') != null) {
      this.tweetService.allTweets().subscribe({
        next: (result) => {
          this.tweets = result;
          this._userservice.updateIsReloadTweet(false);
        },
        error: (_error) => {
          this.userservice.showErrorAlert(
            'Error while loading!! Please Check Network'
          );
        },
      });
    }
  }

  tweetLike(tid: string, isLike: boolean, i: number): void {
    this._tweetService.tweetLike(tid, isLike).subscribe({
      next: (_result: any) => {
        this.tweets[i].likedByLoggedUser = isLike;
      },
      error: (err: any) => {
        this.userservice.showErrorAlert(err.error.error.description);
      },
    });
  }

  tweetDelete(tid: string, i: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showDenyButton: true,
      icon: 'warning',
      confirmButtonColor: '#d33',
      denyButtonColor: '#0000004a',
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._tweetService.tweetDelete(tid).subscribe({
          next: (_result: any) => {
            this.tweets.splice(i, 1);
          },
          error: (err: any) => {
            this.userservice.showErrorAlert(err.error.error.description);
          },
        });
      }
    });
  }

  openEdit(i: number): void {
    var isOn = this.tweets[i].uiEDisplay;

    this.tweets.forEach((element: { uiEDisplay: boolean }) => {
      element.uiEDisplay = false;
    });
    this.msg = this.tweets[i].message;
    this.tag = this.tweets[i].tag;
    this.tweets[i].uiEDisplay = !isOn;
  }

  openReply(i: number): void {
    this.tweets[i].uiEDisplay = false;
    var isOn = this.tweets[i].uiRDisplay;
    this.replies = [];

    this.tweets.forEach((element: { uiRDisplay: boolean }) => {
      element.uiRDisplay = false;
    });

    this.tweets[i].uiRDisplay = !isOn;

    if (this.tweets[i].uiRDisplay) {
      this._tweetService.loadReply(this.tweets[i].id).subscribe({
        next: (result: any) => {
          this.replies = result.replyTweets;
          this.replies.forEach((reply) => {
            this.userservice.allUser().subscribe((users) => {
              if (users) {
                const user = users.find(
                  (item: any) => item.email === reply.emailId
                );
                if (user !== undefined) {
                  reply.fullName = user.firstName + ' ' + user.lastName;
                }
              }
            });
          });
        },
        error: (err: any) => {
          this.userservice.showErrorAlert(err.error.error.description);
        },
      });
    }
  }

  replyMsg(replymsg: any, tId: string): void {
    this.displayLoading = true;
    this._tweetService.tweetReply(tId, replymsg).subscribe({
      next: (_result: any) => {
        this._tweetService.loadReply(tId).subscribe({
          next: (result: any) => {
            this.displayLoading = false;
            this.replies = result.replyTweets;
            this.replies.forEach((reply) => {
              this.userservice.allUser().subscribe((users) => {
                if (users) {
                  const user = users.find(
                    (item: any) => item.email === reply.emailId
                  );
                  if (user !== undefined) {
                    reply.fullName = user.firstName + ' ' + user.lastName;
                  }
                }
              });
            });
          },
          error: (err: any) => {
            this.displayLoading = false;
            this.userservice.showErrorAlert(err.error.error.description);
          },
        });
      },
      error: (err: any) => {
        this.displayLoading = false;
        this.userservice.showErrorAlert(err.error.error.description);
      },
    });
  }

  Update(tId: string, i: number): void {
    this.displayLoading = true;

    this._tweetService
      .updateTweet(
        tId,
        this.tweetEditForm.value.message,
        this.tweetEditForm.value.tag
      )
      .subscribe({
        next: (_result: any) => {
          this.displayLoading = false;
          this.isShowEditSuccess = true;
          this.tweets[i].message = this.tweetEditForm.value.message;
          this.tweets[i].tag = this.tweetEditForm.value.tag;
        },
        error: (err: any) => {
          this.displayError = true;
          this.displayLoading = false;
          this.userservice.showErrorAlert(err.error.error.description);
        },
      });
  }

  ngOnInit(): void {
    if (localStorage.getItem('gender') != null) {
      this.gender = localStorage.getItem('gender') || 'M';
    }
    this.tweetService.MyTweets().subscribe({
      next: (result) => {
        this.tweets = result;
        this.fetchDone = true;
      },
      error: (_error) => {
        this.userservice.showErrorAlert(
          'Error while loading!! Please Check Network'
        );
      },
    });

    this.tweetEditForm.valueChanges.subscribe((_value) => {
      this.displayError = false;
      this.isShowEditSuccess = false;
    });
  }
}

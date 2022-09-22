import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private _http: HttpClient) {}

  base_url = 'https://sumittweetappapi.azurewebsites.net/api/v1';

  PostTweet(message: string, tag: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    const body = { message: message, tag: tag };
    return this._http.post(this.base_url + '/tweets/add', body, options);
  }

  updateTweet(tweetId: string, message: string, tag: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    const body = { tweetId: tweetId, message: message, tag: tag };
    return this._http.put(this.base_url + '/tweets/update', body, options);
  }

  tweetReply(tId: string, msg: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    const body = { tweetId: tId, replymsg: msg };
    return this._http.post(this.base_url + '/tweets/reply', body, options);
  }

  tweetLike(tId: string, like: boolean): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    const body = { tweetId: tId, isLike: like };
    return this._http.post(this.base_url + '/tweets/like', body, options);
  }

  tweetDelete(tId: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    return this._http.delete(this.base_url + '/tweets/delete/' + tId, options);
  }

  allTweets(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    return this._http.get(this.base_url + '/tweets/all', options);
  }

  MyTweets(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let options = { headers: headers };
    return this._http.get(this.base_url + '/tweets', options);
  }

  loadReply(tweetId: String) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JwtToken') || 'error',
    });
    let queries = new HttpParams().set('tweetId', tweetId.toString());
    let options = { headers: headers, params: queries };
    return this._http.get(this.base_url + '/tweetboard', options);
  }
}

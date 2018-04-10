import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from "rxjs"
import { UtilsProvider } from "../utils/utils"
import { SERVER_URL } from "../constants/constants"
import { ModalController } from 'ionic-angular';



@Injectable()
export class HttpServiceProvider {

  constructor(public http: Http,public modalCtrl:ModalController) {
    console.log('Hello HttpServiceProvider Provider');
  }


  public postFormData(url: string, paramMap?: any): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json;charset=utf-8'
    });
    return this.http.post(SERVER_URL + url, HttpServiceProvider.buildURLSearchParams(paramMap).toString(), new RequestOptions({ headers: headers, withCredentials: true }))
      // .map(data => {
      //   let code_ = data.json().code;
      //   console.log(code_);
      //   if (code_ == "000044") {
      //     // alert("弹出登录窗口");
      //     localStorage.removeItem('personal');
      //     let modal = this.modalCtrl.create('LoginPage');
      //     modal.present();
      //     console.log("查不到数据！！！！！！！！！！！！！！！！！！！！！！！！！");
      //     console.log(url);
      //   } else {
      //
      //   }
      //   return data;
      //
      // })

  }





  // public postFormData2(url: string, paramMap?: any): Observable<Response> {
  //   let headers = new Headers({
  //     'Content-Type': 'multipart/form-data; charset=UTF-8',
  //     'Accept': 'application/json;charset=utf-8'
  //   });
  //   return this.http.post(SERVER_URL + url, HttpServiceProvider.buildURLSearchParams(paramMap).toString(), new RequestOptions({ headers: headers, withCredentials: true, responseType: 3, }))
  // }

  public get(url: string, paramMap?: any): Observable<Response> {

    //return this.http.get(url, {search: HttpServiceProvider.buildURLSearchParams(paramMap),withCredentials:true});
    return this.http.get(SERVER_URL + url, { search: HttpServiceProvider.buildURLSearchParams(paramMap) }).map(data => { console.log(data.json()); return data });
  }

  // 默认Content-Type为application/json;
  public post(url: string, body: any = null): Observable<Response> {

    return this.http.post(SERVER_URL + url, body, new RequestOptions({ withCredentials: true })).map(data => { console.log(data); return data });
  }

  public put(url: string, body: any = null, options?): Observable<Response> {

    return this.http.put(SERVER_URL + url, body, options);
  }

  public delete(url: string, paramMap?: any): Observable<Response> {

    return this.http.delete(SERVER_URL + url, { search: HttpServiceProvider.buildURLSearchParams(paramMap) });
  }

  public patch(url: string, body: any = null, options?): Observable<Response> {

    return this.http.patch(SERVER_URL + url, body, options);
  }

  public head(url: string, paramMap?: any): Observable<Response> {

    return this.http.head(SERVER_URL + url, { search: HttpServiceProvider.buildURLSearchParams(paramMap) });
  }

  public options(url: string, paramMap?: any): Observable<Response> {

    return this.http.options(SERVER_URL + url, { search: HttpServiceProvider.buildURLSearchParams(paramMap) });
  }

  public static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = UtilsProvider.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }



}

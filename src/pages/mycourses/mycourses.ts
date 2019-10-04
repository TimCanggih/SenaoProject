import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { SigninPage } from '../signin/signin';
import { AcdetailPage } from '../acdetail/acdetail';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-mycourses',
  templateUrl: 'mycourses.html',
})

export class MycoursesPage {

  public data : Array<any> = [];

  public imgNotAvailable: string = "assets/main/img_not_available.png";

  userid: any;
  courseId: any;
  mapelId: any;

  response: any;

  username: any;

  brokenImage = [];

  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public navParams: NavParams,
    public event: Events) {
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  ionViewWillEnter() : void {
    this.clearData();
    this.callData();
  }

  callData(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")) {
      this.response = "NotLogin";
    }
    else{
      this.userid = window.localStorage.getItem('userid');

      this.response = "GettingData";

      let parameter = new HttpParams().set('userid', this.userid);

      this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetMapelSiswa.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
        if(data.length > 0){
          this.data = data;
          this.response = "Success";
        }
        else{
          this.response = "Failed";
        }
      }, (error: any) => {
        this.response = "Error";
      });
    }
  }

  doSignIn(){
    this.navCtrl.push(SigninPage, { requestMyCoursesPage: "RequestDataFromMyCoursesPage" });
  }

  goToProgress(param: any){
    this.navCtrl.push(AcdetailPage, param);
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { LearningPage } from '../learning/learning';
import { SigninPage } from '../signin/signin';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-cdetail',
  templateUrl: 'cdetail.html',
})

export class CdetailPage {

  public courseData : Array<any> = [];
  public progressData: Array<any> = [];

  public imgNotAvailable: string = "assets/main/img_not_available.png";

  courseId: any;
  mapelId: any;
  submateriId: any;
  userId: any;
  instructor: any;

  response: any;
  progressResponse: any;
  progressStatus: any;

  progressPercentage: any;

  numSubMateri: number;
  numProgress: number;

  brokenImage = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public event: Events) {
  }

  clearData(){
    this.response = "GettingData";
    this.courseData = [];
  }

  ionViewWillEnter() : void {
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")) {
      this.response = "NotLogin";
    }
    else if(this.navParams.get("record")){
      this.userId = window.localStorage.getItem("userid");

      this.instructor = this.navParams.get("instructor");
      this.mapelId = this.navParams.get("mapel_id");
      this.submateriId = this.navParams.get("submateriId");
      this.courseId = this.navParams.get("t_mapel_id");
      this.submateriId = this.navParams.get("submateriId");

      window.localStorage.setItem("instructor", this.instructor);
      window.localStorage.setItem("t_mapel_id", this.courseId);

      this.clearData();
      this.getData(this.navParams.get("record"));
      this.callData();
    }
    else{
      this.userId = window.localStorage.getItem("userid");

      this.submateriId = this.navParams.get("submateriId");

      this.instructor = this.navParams.get("instructor");
      this.mapelId = this.navParams.get("mapel_id");
      this.courseId = this.navParams.get("t_mapel_id");

      window.localStorage.setItem("instructor", this.instructor);
      window.localStorage.setItem("t_mapel_id", this.courseId);

      if(this.courseId) {
        this.clearData();
        this.callData();
      }

    }
  }

  getData(data: any) : void {
    this.mapelId = data.id_mapel;
    this.courseId = data.id_mapelqu;
    this.instructor = data.nama_dosen;
  }

  callData(){
    this.response = "GettingData";

    let fourthParameter = new HttpParams().set('userid', this.userId).set('submateriId', this.submateriId);
    let firstParameter = new HttpParams().set('id', this.courseId);
    let secondParameter = new HttpParams().set('id', this.mapelId);
    let thirdParameter = new HttpParams().set('id', this.mapelId).set('userid', this.userId);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetMateriList.php', { params: firstParameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.event.subscribe('data:coursedata', () => {
          this.courseData = data;
        });
        this.response = "GettingData";

        this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetNumOfSubmateriByMapel.php', { params: secondParameter }).timeout(30000).subscribe((data : any) => {
          if(data.length > 0){
            this.numSubMateri = data.length;
            this.response = "GettingData";

            this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetNumOfSubmateriByMapelAndSiswaInProgress.php', { params: thirdParameter }).timeout(30000).subscribe((data : any) => {
              if(data.length > 0){
                this.response = "GettingData";

                this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetProgressExist.php', { params: fourthParameter }).timeout(30000).subscribe((progressExist : any) => {
                  if(progressExist.length > 0){
                    this.event.publish('data:coursedata');
                    
                    this.numProgress = data.length;

                    this.response = "Success";
                    this.progressResponse = "ProgressFound";
                    this.progressStatus = "Found";

                    this.progressPercentage = this.numProgress / this.numSubMateri * 100;
                    this.progressData = progressExist;
                  }
                  else{
                    this.event.publish('data:coursedata');
                    
                    this.numProgress = data.length;

                    this.response = "Success";
                    this.progressResponse = "ProgressFound";
                    this.progressStatus = "NotFound";

                    this.progressPercentage = this.numProgress / this.numSubMateri * 100;
                    this.progressData = progressExist;
                  }
                },(error: any) => {
                  this.event.publish('data:coursedata');
                    
                  this.numProgress = data.length;

                  this.response = "Success";
                  this.progressResponse = "ProgressFound";
                  this.progressStatus = "ErrorFound";

                  this.progressPercentage = this.numProgress / this.numSubMateri * 100;
                });
              }
              else{
                this.event.publish('data:coursedata');

                this.numProgress = data.length;

                this.response = "Success";
                this.progressResponse = "ProgressNotFound";
                this.progressStatus = "FailedFound";

                this.progressPercentage = this.numProgress / this.numSubMateri * 100;
              }
            }, (error: any) => {
              this.event.publish('data:coursedata');

              this.numProgress = data.length;

              this.response = "Success";
              this.progressResponse = "ProgressError";
              this.progressStatus = "ErrorFound";

              this.progressPercentage = this.numProgress / this.numSubMateri * 100;
            });
          }
          else{
            this.response = "Failed";
          }
        }, (error: any) => {
          this.response = "Error";
        });
      }
      else{
        this.response = "Failed";
      }
    }, (error: any) => {
      this.response = "Error";
    });
  }

  doSignIn(){
    this.navCtrl.push(SigninPage, { requestCdetailPage: "RequestDataFromCdetail" });
  }

  goToLearning(param: any){
    this.navCtrl.push(LearningPage, param);
  }

  goToLearnings(param: any, params: any){
    this.navCtrl.push(LearningPage, param, params);
  }

}
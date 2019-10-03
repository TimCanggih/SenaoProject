import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { AllcoursesPage } from '../allcourses/allcourses';
import { AcdetailPage } from '../acdetail/acdetail';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public sliderData : Array<any> = [];
  public topCoursesData : Array<any> = [];
  public courseTransactionData : Array<any> = [];
  public testimonialData : Array<any> = [];

  userid: any;

  response: any;
  responseStatus: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public event: Events) {
  }

  doRefresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  clearData(){
    this.response = "GettingData";
    this.sliderData = [];
    this.topCoursesData = [];
  }

  ionViewWillEnter(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")) {
      this.userid = window.localStorage.getItem("userid");
    
      this.clearData();
      this.getData();
    }
    else{
      this.userid = window.localStorage.getItem("userid");
    
      this.clearData();
      this.getData();
    }
  }

  getData(){
    this.response = "GettingData";

    let parameter = new HttpParams().set('userid', this.userid);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetSlider.php').timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.event.subscribe('data:sliderData',() => {
          this.sliderData = data;
        });

        this.response = "GettingData";

        this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetTopCoursesFromHome.php').timeout(30000).subscribe((data : any) => {
          if(data.length > 0){
            this.event.subscribe('data:topCoursesData',() => {
              this.topCoursesData = data;
            });
            
            this.response = "GettingData";
            
            this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetTestimonial.php').timeout(30000).subscribe((data : any) => {
              if(data.length > 0){
                this.event.subscribe('data:testimonialData',() => {
                  this.testimonialData = data;
                });

                this.response = "GettingData";
                
                this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetCourseTransactionStatus.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
                  if(data.length > 0){
                    this.event.subscribe('data:courseTransactionData',() => {
                      this.courseTransactionData = data;
                    });

                    this.event.publish('data:sliderData');
                    this.event.publish('data:topCoursesData');
                    this.event.publish('data:testimonialData');
                    this.event.publish('data:courseTransactionData');
                    
                    this.response = "Success";
                    this.responseStatus = "Found";
                  }
                  else{
                    this.event.publish('data:sliderData');
                    this.event.publish('data:topCoursesData');
                    this.event.publish('data:testimonialData');

                    this.response = "Success";
                    this.responseStatus = "NotFound";
                  }
                }, (error: any) => {
                  this.event.publish('data:sliderData');
                  this.event.publish('data:topCoursesData');
                  this.event.publish('data:testimonialData');

                  this.response = "Success";
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
      else{
        this.response = "Failed";
      }
    }, (error: any) => {
      this.response = "Error";
    });
  }

  goToAllCourses(){
    this.navCtrl.push(AllcoursesPage, { requestFromHomePage: 'requestAllCoursesData' });
  }

  goToDetailCourses(param: any){
    this.navCtrl.push(AcdetailPage, param);
  }

}
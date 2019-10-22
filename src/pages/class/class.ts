import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { AllcoursesPage } from '../allcourses/allcourses';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})

export class ClassPage {

  public data : Array<any> = [];
  
  public imgNotAvailable: string = "assets/main/img_not_available.png";

  response: any;

  brokenImage = [];

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public event: Events) {
  }

  doRefresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewWillEnter(){
    this.clearData();
    this.getData();
  }

  clearData(){
    this.data = [];
  }

  goToAllCourses(param : any) : void {
    this.navCtrl.push(AllcoursesPage, param);
  }

  getData(){
    this.response = "GettingData";

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetClass.php').timeout(30000).subscribe((data : any) => {
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
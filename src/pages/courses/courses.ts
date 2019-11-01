import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CdetailPage } from '../cdetail/cdetail';
import { SigninPage } from '../signin/signin';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})

export class CoursesPage {

  public data : Array<any> = [];

  public imgNotAvailable: string = "assets/main/img_not_available.png";

  namaKursus: any;

  courseId: any;

  t_mapel_id: any;
  submateriId: any;
  mapel_id: any;
  instructor: any;

  response: any;

  requestPage: any = "RequestDataFromCoursesPage";

  brokenImage = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient) {
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  ionViewWillEnter() : void{
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")) {
      this.response = "NotLogin";
    }
    else if(this.navParams.get("record")){
      this.clearData();
      this.getData(this.navParams.get("record"));
      this.callData();

      this.namaKursus = window.localStorage.getItem("NamaKursus");
      this.submateriId = window.localStorage.getItem("SubmateriID");
    }
  }

  getData(data : any) : void{
    this.courseId = data.id;
  }

  callData(){
    this.response = "GettingData";

    let parameter = new HttpParams().set('id', this.courseId);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetMateriMapel.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.data = data;
        this.response = "Success";

        data.map(item => {
          this.mapel_id = item.mapel_id;
          this.t_mapel_id = item.t_mapel_id;
          this.instructor = item.nama_dosen;
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
    this.navCtrl.push(SigninPage, { requestCoursesPage: "RequestDataFromCoursesPage" });
  }

  goToProgress(){
    this.navCtrl.push(CdetailPage, { requestPage: this.requestPage, mapel_id: this.mapel_id, t_mapel_id: this.t_mapel_id, courseid: this.courseId, instructor: this.instructor, submateriId: this.submateriId });
  }

}
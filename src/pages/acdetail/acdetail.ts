import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController, AlertController, 
  LoadingController, Platform, Events } from 'ionic-angular';

import { CoursesPage } from '../courses/courses';
import { SigninPage } from '../signin/signin';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-acdetail',
  templateUrl: 'acdetail.html',
})

export class AcdetailPage {

  public data : Array<any> = [];
  public courseTransactionData : Array<any> = [];

  public imgNotAvailable: string = "assets/main/img_not_available.png";

  private toastInstance: Toast;

  namaKelas: any;
  courseName: any;
  courseId: any;
  submateriId: any;
  price: any;
  year: any;
  status: any;

  username: any;
  password: any;
  userid: any;

  response: any;
  responseStatus: any;

  brokenImage = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public httpPost: Http,
    public alert: AlertController,
    public loading: LoadingController,
    public platform: Platform,
    public event: Events,
    public toast: ToastController) {
  }

  unregisterBackButtonAction(){
    this.platform.registerBackButtonAction(() => {});
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  ionViewWillEnter() : void{
    if(this.navParams.get("record")){
      this.username = window.localStorage.getItem("username");
      this.password = window.localStorage.getItem("password");
      this.userid = window.localStorage.getItem("userid");

      this.clearData();
      this.getData(this.navParams.get("record"));
      this.callData();
    }
  }

  getData(data : any) : void{
    this.status = data.stat;
    this.namaKelas = data.nama_kelas;
    this.courseId = data.id;
    this.submateriId = data.id_mapelqu;
    this.price = data.harga;
    this.year = data.tahun;

    window.localStorage.setItem("NamaKelasForLearning", this.namaKelas);
    window.localStorage.setItem("SubmateriID", this.submateriId);
  }

  callData(){
    this.response = "GettingData";

    let firstparameter = new HttpParams().set('id', this.courseId);
    let secondparameter = new HttpParams().set('id', this.courseId).set('userid', this.userid);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetMapelById.php', { params: firstparameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.event.subscribe('data:mapelByIdData',() => {
          this.data = data;

          data.map(item => {
            this.courseName = item.nama;
  
            window.localStorage.setItem("NamaKursus", this.courseName);
            window.localStorage.setItem("CourseIDForLearning", this.courseId);
          });
        });

        this.response = "GettingData";

        this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetCourseTransactionStatusByCourseId.php', { params: secondparameter }).timeout(30000).subscribe((data : any) => {
          if(data.length > 0){
            this.event.subscribe('data:courseTransactionData',() => {
              this.courseTransactionData = data;
            });

            this.event.publish('data:mapelByIdData');
            this.event.publish('data:courseTransactionData');

            this.response = "Success";
            this.responseStatus = "Found";
          }
          else{
            this.event.publish('data:mapelByIdData');

            this.response = "Success";
            this.responseStatus = "NotFound";
          }
        },(error: any) => {
          this.event.publish('data:mapelByIdData');

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

  onSuccessLike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Liked.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onFailedLike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Failed like this course.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onErrorLike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Error like this course.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onSuccessDislike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Disliked.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onFailedDislike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Failed dislike this course.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onErrorDislike(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Error dislike this course.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  doLike(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")){
      const alert = this.alert.create({
        title: 'Oops',
        subTitle: "You must log in first to like this course.",
        buttons: ['Ok'],
        cssClass: 'alert-container',
        enableBackdropDismiss: false
      });
      alert.present();
    }
    else{
      var headers = new Headers();
    
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });

      let parameter = "&userid=" + this.userid + "&courseId=" + this.courseId + "&null=";
    
      this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Dolike.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
        if(response.status){
          this.onSuccessLike();
        }
        else{
          this.onFailedLike();
        }
      }, (error: any) => {
        this.onErrorLike();
      });
    }
  }

  doDislike(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")){
      const alert = this.alert.create({
        title: 'Oops',
        subTitle: "You must log in first to dislike this course.",
        buttons: ['Ok'],
        cssClass: 'alert-container',
        enableBackdropDismiss: false
      });
      alert.present();
    }
    else{
      var headers = new Headers();
    
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });

      let parameter = "&userid=" + this.userid + "&courseId=" + this.courseId + "&null=";
    
      this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Dodislike.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
        if(response.status){
          this.onSuccessDislike();
        }
        else{
          this.onFailedDislike();
        }
      }, (error: any) => {
        this.onErrorDislike();
      });
    }
  }

  onSignInRequest(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Please login first.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  goToCourses(param: any){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")){
      this.onSignInRequest();
      this.navCtrl.push(SigninPage, { parameter: 'requestCoursesPage' });
    }
    else if(this.submateriId == 'undefined' || this.submateriId == null || this.submateriId == ''){
      const alert = this.alert.create({
        title: 'Info',
        subTitle: "You can start this course on 'My Courses' page.",
        buttons: ['Ok'],
        cssClass: 'alert-container',
        enableBackdropDismiss: false
      });
      alert.present();
    }
    else{
      let loader = this.loading.create({
        content: '<p style="color: #000;"><strong>Please wait...</strong></p>',
        enableBackdropDismiss: false
      });
  
      loader.present();

      let parameter = new HttpParams().set('userid', this.userid).set('courseId', this.courseId);

      this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/CourseTransactionChecker.php', { params: parameter }).timeout(30000).subscribe((result : any) => {
        if(result.length > 0){
          loader.dismiss();
          this.navCtrl.push(CoursesPage, param);
          this.event.publish('action:register');
        }
        else{
          const alert = this.alert.create({
            title: 'Oops!',
            subTitle: "You cannot start this course because you are not subscribed or you have subscribed to this course but the status is still not verified. Please check your wishlist status.",
            buttons: ['Ok'],
            cssClass: 'alert-container',
            enableBackdropDismiss: false
          });
          alert.present();

          loader.dismiss();
          this.event.publish('action:register');
        }
      }, (error: any) => {
        loader.dismiss();
        this.event.publish('action:register');
      });

      if(loader.present()){
        this.unregisterBackButtonAction();
      }
    }
  }

  doAddWishlist(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")){
      const alert = this.alert.create({
        title: 'Oops',
        subTitle: "You must log in first to add this course to the wishlist.",
        buttons: ['Ok'],
        cssClass: 'alert-container',
        enableBackdropDismiss: false
      });
      alert.present();
    }
    else{
      var headers = new Headers();
    
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });

      let parameterGetData = new HttpParams().set('userid', this.userid).set('courseId', this.courseId);

      let parameter = "&userid=" + this.userid + "&courseId=" + this.courseId + "&null=";

      this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/CourseTransactionChecker.php', { params: parameterGetData }).timeout(30000).subscribe((result : any) => {
        if(result.length > 0){
          const alert = this.alert.create({
            title: 'Oops!',
            subTitle: "You cannot add this course to the wishlist because you have subscribed.",
            buttons: ['Ok'],
            cssClass: 'alert-container',
            enableBackdropDismiss: false
          });
          alert.present();
        }
        else{
          this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Addwishlist.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
            if(response.status){
              this.successAddWishlist();
            }
            else{
              this.failedAddWishlist();
            }
          }, (error: any) => {
            this.errorAddWishlist();
          });
        }
      }, (error: any) => {
        this.errorAddWishlist();
      });
    }
  }

  successAddWishlist(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Added to wishlist.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  failedAddWishlist(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Failed add to wishlist, try again.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  errorAddWishlist(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Error add to wishlist, try again.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, Toast } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})

export class CommentPage {

  public data : Array<any> = [];

  private toastInstance: Toast;

  authForm: FormGroup;

  userid: any;
  subyek: any;
  deskripsi: any;
  kontenMateriID: any;

  response: any;

  constructor(public formBuilder: FormBuilder,
    public navParams: NavParams,
    public http: HttpClient,
    public httpPost: Http,
    private toast: ToastController) {

    this.authForm = formBuilder.group({
      subyek: ['', Validators.compose([Validators.required])],
      deskripsi: ['', Validators.compose([Validators.required])]
    });

  }

  resetForm(){
    this.authForm.reset();
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  onSubmit(): void {
    if(this.authForm.valid){
    }
    else {
    }
  }

  ionViewWillEnter() : void { 
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")) {
      this.response = "NotLogin";
    }
    else if(this.navParams.get("record")){
      this.userid = window.localStorage.getItem("userid");

      this.clearData();
      this.getData(this.navParams.get("record"));
      this.callData();
    }
  }

  getData(thirdData: any) : void {
    this.kontenMateriID = thirdData.id;
  }

  callData(){
    this.response = "GettingData";

    let parameter = new HttpParams().set('kontenmateri_id', this.kontenMateriID);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetKomentar.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.data = data;
        this.response = "CommentFound";
      }
      else{
        this.data = data;
        this.response = "CommentNull";
      }
    }, (error: any) => {
      this.response = "CommentError";
    });
  }

  failedToast(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Failed sending your comment.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  errorToast(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "Error sending your comment, please send again.",
      duration: 2000,
      position: "bottom",
      cssClass: "bottom-toast-send-comment"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  postData(){
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let parameter = "&userid=" + this.userid + "&kontenmateri_id=" + this.kontenMateriID + "&subyek=" + this.subyek + "&deskripsi=" + this.deskripsi + "&null=";

    this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Sendkomentar.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
      if(response.status){
        this.resetForm();
        this.ionViewWillEnter();
      }
      else{
        this.ionViewWillEnter();
        this.failedToast();
      }
    }, (error: any) => {
      this.ionViewWillEnter();
      this.errorToast();
    });
  }
}
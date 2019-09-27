import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-rpassword',
  templateUrl: 'rpassword.html',
})

export class RpasswordPage {

  authForm: FormGroup;

  id: any;

  password: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http,
    public loading: LoadingController,
    public platform: Platform,
    public event: Events,
    public formBuilder: FormBuilder) {

      this.authForm = formBuilder.group({
        password: ['', Validators.compose([Validators.required])]
      });

  }

  onSubmit(): void {
    if(this.authForm.valid){
    }
    else {
    }
  }

  unregisterBackButtonAction(){
    this.platform.registerBackButtonAction(() => {});
  }

  ionViewWillEnter() : void{
    if(this.navParams.get("record")){
      this.getData(this.navParams.get("record"));
    }
  }

  getData(data : any) : void{
    this.id = data.id;
  }

  postData(){
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Please wait...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    let parameter = "&password=" + this.password + "&user_id=" + this.id + "&null=";

    this.http.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Resetpassword.php?view=update", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
      if(response.status){
        loader.dismiss();
        swal ("Success!","Your password has been changed!","success");
        this.event.publish('action:register');
      }
      else{
        loader.dismiss();
        this.event.publish('action:register');
        this.failedPopUp();
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  failedPopUp(){
    swal({
      title: "Oops",
      text: "Failed to reset your password!",
      icon: "error",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["Cancel","Try again"]
    })
    .then((willRefresh) => {
      if (willRefresh) {
        this.postData();
      }
    });
  }

  errorPopUp(){
    swal({
      title: "Oops",
      text: "Request was lost!",
      icon: "error",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["Cancel","Try again"]
    })
    .then((willRefresh) => {
      if (willRefresh) {
        this.postData();
      }
    });
  }

}
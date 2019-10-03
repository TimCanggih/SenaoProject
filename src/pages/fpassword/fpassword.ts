import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RpasswordPage } from '../rpassword/rpassword';

import swal from 'sweetalert';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-fpassword',
  templateUrl: 'fpassword.html',
})

export class FpasswordPage {

  public data : Array<any> = [];

  authForm: FormGroup;

  email: any;

  constructor(public navCtrl: NavController, 
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public platform: Platform,
    public event: Events) {

      this.authForm = formBuilder.group({
        email: ['', Validators.compose([Validators.email])]
      });

  }

  ionViewDidLeave(){
    this.authForm.reset();
    this.data = [];
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

  doAction(){
    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Checking your email...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    let parameter = new HttpParams().set('email', this.email);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Forgotpassword.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        loader.dismiss();
        this.data = data;
        this.event.publish('action:register');
      }
      else{
        loader.dismiss();
        swal ("Oops","Your email not found!","error");
        this.event.publish('action:register');
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
        this.doAction();
      }
    });
  }

  goToResetPassword(param: any): void {
    this.navCtrl.push(RpasswordPage, param);
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Events } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { SigninPage } from '../signin/signin';
import { CprofilePage } from '../cprofile/cprofile';

import swal from 'sweetalert';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage {

  public data : Array<any> = [];

  public imgNotAvailable: string = "assets/main/img_not_available.png";

  response: any;

  userId: any;
  username: any;
  password: any;

  brokenImage = [];

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public httpPost: Http,
    public modalCtrl: ModalController,
    public event: Events) {
  }

  ionViewWillEnter() {
    this.clearData();
    this.getData();
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  doRefresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  goToSignIn(){
    this.navCtrl.push(SigninPage);
  }

  goToChangeProfile(){
    this.navCtrl.push(CprofilePage);
  }

  signOutActivity(){
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let parameter = "&username=" + this.username + "&null=";
    
    this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/UserLogoutActivity.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
      if(response.status){
      }
      else{
      }
    }, (error: any) => {
    });
  }

  getData(){
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")) {
      this.response = "Null";
    }
    else {
      this.username = window.localStorage.getItem('username');
      this.password = window.localStorage.getItem('password');

      let parameter = new HttpParams().set('username', this.username);

      this.response = "GettingData";

      this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Dataloginsession.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
        if(data.length > 0){
          this.response = "Success";
          this.data = data;

          data.map(item => {
            this.userId = item.id_siswa;
            this.password = item.password;
            window.localStorage.setItem('userid', this.userId);
          });
        }
        else{
          this.response = "Failed";
          window.localStorage.removeItem('userid');
        }
      }, (error: any) => {
        this.response = "Error";
        window.localStorage.removeItem('userid');
      });
    }
  }

  doSignOut(){
    swal({
      title: "Are you sure ?",
      text: "you will be sign out",
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["No", "Yes"]
    })
    .then((willSignOut) => {
      if (willSignOut) {
        swal({
          title: "Success!",
          text: "you have sign out now",
          icon: "success",
        });
        this.signOutActivity();

        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        window.localStorage.removeItem('userid');
        window.localStorage.removeItem("callBackRequest");

        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      } 
      else {
      }
    });
  }

  goToModalSettings(){
    const modal = this.modalCtrl.create(SettingsPage, {}, { showBackdrop: true, enableBackdropDismiss: false, cssClass: "settings-modal" });
    modal.present();
  }

}
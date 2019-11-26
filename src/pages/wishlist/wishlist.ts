import { Component } from '@angular/core';
import { IonicPage, NavController, Events, LoadingController, Platform, ModalController } from 'ionic-angular';

import { SigninPage } from '../signin/signin';
import { PaymentPage } from '../payment/payment';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/timeout';

import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})

export class WishlistPage {

  public data : Array<any> = [];

  isHidden: boolean = false;

  userid: any;

  itemText: any;
  itemTotal: any;
  priceTotal: any;

  response: any;

  courseId: any;
  dateTime: any;

  constructor(public event: Events,
    public httpPost: Http,
    public http: HttpClient,
    public navCtrl: NavController,
    public loading: LoadingController,
    public platform: Platform,
    public modal: ModalController) {
  }

  doRefresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  pressEvent(data: any){
    this.courseId = data.id_mapel;
    this.dateTime = data.tgl_transaksi;

    swal({
      title: "Are you sure ?",
      text: "this item will be delete.",
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["No","Yes"]
    })
    .then((willDelete) => {
      if (willDelete) {

        var headers = new Headers();
  
        headers.append('Content-Type', 'application/x-www-form-urlencoded' );

        let options = new RequestOptions({ headers: headers });

        let loader = this.loading.create({
          content: '<p style="color: #000;"><strong>Please wait...</strong></p>',
          enableBackdropDismiss: false
        });

        loader.present();

        let parameter = "&userid=" + this.userid + "&courseId=" + this.courseId + "&dateTime=" + this.dateTime + "&null=";

        this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Deletewishlist.php?view=delete", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
          if(response.status){
            loader.dismiss();
            swal ("Success!","Wishlist deleted!","success");
            this.doRefresh();
            this.event.publish('action:register');
          }
          else{
            loader.dismiss();
            this.doRefresh();
            this.event.publish('action:register');
            this.failedPopUp();
          }
        }, (error: any) => {
          loader.dismiss();
          this.doRefresh();
          this.event.publish('action:register');
          this.errorPopUp();
        });

        if(loader.present()){
          this.unregisterBackButtonAction();
        }

      }
      else{
      }
    });
  }

  deleteAllDataConfirm(){
    swal({
      title: "Are you sure ?",
      text: "all your wishlist will be delete.",
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["No","Yes"]
    })
    .then((willDelete) => {
      if (willDelete) {
        this.doDeleteAllWishlist();
      }
      else{
      }
    });
  }

  clearData(){
    this.response = "GettingData";
    this.data = [];
  }

  ionViewWillEnter() : void {
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")
    && (window.localStorage.getItem('userid') === "undefined" || window.localStorage.getItem('userid') === null || window.localStorage.getItem('userid') === "")) {
      this.response = "NotLogin";
    }
    else{
      this.userid = window.localStorage.getItem('userid');

      this.clearData();
      this.getData();
    }
  }

  getData(){
    this.response = "GettingData";

    let parameter = new HttpParams().set('userid', this.userid);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/GetWishlist.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){
        this.data = data;
        this.response = "Success";
        this.isHidden = false;

        data.map(item => {
          this.itemTotal = data.length;
          this.priceTotal = item.total_harga;
        });

        if(data.length == 1){
          this.itemText = "Item";
        }
        else{
          this.itemText = "Items";
        }
        
      }
      else{
        this.response = "Failed";
        this.isHidden = true;
      }
    }, (error: any) => {
      this.response = "Error";
      this.isHidden = true;
    });
  }

  unregisterBackButtonAction(){
    this.platform.registerBackButtonAction(() => {});
  }

  failedPopUp(){
    swal({
      title: "Oops",
      text: "Failed to delete your wishlist!",
      icon: "error",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["Cancel","Try again"]
    })
    .then((willDelete) => {
      if (willDelete) {
        this.doDeleteAllWishlist();
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
        this.doDeleteAllWishlist();
      }
    });
  }

  doDeleteAllWishlist(){
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Please wait...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    let parameter = "&userid=" + this.userid + "&null=";

    this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/DoDeleteAllWishlist.php?view=delete", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
      if(response.status){
        loader.dismiss();
        swal ("Success!","All wishlist deleted!","success");
        this.doRefresh();
        this.event.publish('action:register');
      }
      else{
        loader.dismiss();
        this.doRefresh();
        this.event.publish('action:register');
        this.failedPopUp();
      }
    }, (error: any) => {
      loader.dismiss();
      this.doRefresh();
      this.event.publish('action:register');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doSignIn(){
    this.navCtrl.push(SigninPage, { requestWishlistPage: "RequestDataFromWishlistPage" });
  }

  goToPayment(param: any){
    const modal = this.modal.create(PaymentPage, param, { showBackdrop: true, enableBackdropDismiss: false, cssClass: "payment-modal" });
    modal.present();
  }

}
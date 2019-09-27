import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert';

import { SignupPage } from '../signup/signup';
import { FpasswordPage } from '../fpassword/fpassword';
import { MycoursesPage } from '../mycourses/mycourses';
import { ClassPage } from '../class/class';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInService } from './signinservice';
import 'rxjs/add/operator/timeout';

import { SplashScreen } from '@ionic-native/splash-screen';

export class Login {
  username: string;
  password: string;
}

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [ SignInService ]
})

export class SigninPage {

  public errorImage: string = "assets/main/rto_background.png";

  authForm: FormGroup;

  login: Login = {
    username: '',
    password: ''
  }

  username: any;
  userId: any;

  response: any;

  request: any;
  requestWishlist: any;
  requestCourses: any;
  requestCdetail: any;
  requestLearning: any;
  requestTransaction: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service: SignInService,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public app: App,
    public platform: Platform,
    public event: Events,
    public http: HttpClient,
    public httpPost: Http,
    public splashScreen: SplashScreen) {

      this.authForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
      });

  }

  ionViewWillEnter(){
    this.splashScreen.hide();

    this.requestWishlist = this.navParams.get("requestWishlistPage");
    this.requestTransaction = this.navParams.get("requestTransactionPage");
    this.requestLearning = this.navParams.get("requestLearningPage");
    this.requestCdetail = this.navParams.get("requestCdetailPage");
    this.requestCourses = this.navParams.get("requestCoursesPage");
    this.request = this.navParams.get("requestMyCoursesPage");
    this.response = this.navParams.get("parameter");
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToForgotPassword() {
    this.navCtrl.push(FpasswordPage);
  }

  onSubmit(): void {
    if(this.authForm.valid){
    }
    else {
    }
  }

  signInActivity(){
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let parameter = "&username=" + this.login.username + "&null=";
    
    this.httpPost.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/UserLoginActivity.php?view=insert", JSON.stringify(parameter), options).timeout(30000).subscribe(response => {
      if(response.status){
      }
      else{
      }
    }, (error: any) => {
    });
  }

  saveSession(value: any): void {
    if(value.username === "undefined" || value.username === null || value.username === ""
    && value.password === "undefined" || value.password === null || value.password === "") {
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
    }
    else {
      window.localStorage.setItem('username', value.username);
      window.localStorage.setItem('password', value.password);
    }
  }

  unregisterBackButtonAction(){
    this.platform.registerBackButtonAction(() => {});
  }

  checkNavigation(){
    if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "")){
      this.doAuth();
    }
    else if((this.response !== "undefined" || this.response !== null || this.response !== "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "")){
      this.doAuthRequest();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "") && (this.request !== "undefined" || this.request !== null || this.request !== "")){
      this.doAuthRequestFromMyCoursesPage();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "") && (this.requestCourses !== "undefined" || this.requestCourses !== null || this.requestCourses !== "")){
      this.doAuthRequestFromCoursesPage();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "") && (this.requestCdetail !== "undefined" || this.requestCdetail !== null || this.requestCdetail !== "")){
      this.doAuthRequestFromCdetailPage();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "") && (this.requestLearning !== "undefined" || this.requestLearning !== null || this.requestLearning !== "")){
      this.doAuthRequestFromLearningPage();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestWishlist == "undefined" || this.requestWishlist == null || this.requestWishlist == "") && (this.requestTransaction !== "undefined" || this.requestTransaction !== null || this.requestTransaction !== "")){
      this.doAuthRequestFromTransactionPage();
    }
    else if((this.response == "undefined" || this.response == null || this.response == "") && (this.request == "undefined" || this.request == null || this.request == "") && (this.requestCourses == "undefined" || this.requestCourses == null || this.requestCourses == "") && (this.requestCdetail == "undefined" || this.requestCdetail == null || this.requestCdetail == "") && (this.requestLearning == "undefined" || this.requestLearning == null || this.requestLearning == "") && (this.requestTransaction == "undefined" || this.requestTransaction == null || this.requestTransaction == "") && (this.requestWishlist !== "undefined" || this.requestWishlist !== null || this.requestWishlist !== "")){
      this.doAuthRequestFromWishlistPage();
    }
    else{
    }
  }

  doAuth() {
    this.saveSession(this.login);

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        // this.navCtrl.pop();
        swal ("Oops","Sign in success!","success");
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequest() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.pop();
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromCoursesPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.pop();
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromCdetailPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.setRoot(ClassPage);
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromMyCoursesPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.pop();
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromLearningPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.setRoot(MycoursesPage);
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromTransactionPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.pop();
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  doAuthRequestFromWishlistPage() {
    this.saveSession(this.login);
    this.setUserId();

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Logging in...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.service.getAuthData(this.login).timeout(30000).subscribe(data => {
      if(data.result) {
        loader.dismiss();

        this.signInActivity();
        this.event.publish('action:register');
        this.navCtrl.pop();
      }
      else {
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Username or password invalid!","error");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    }, (error: any) => {
      loader.dismiss();
      this.event.publish('action:register');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('password');
      this.errorPopUp();
    });

    if(loader.present()){
      this.unregisterBackButtonAction();
    }
  }

  setUserId(){
    this.username = window.localStorage.getItem('username');

    let parameter = new HttpParams().set('username', this.username);

    this.http.get('https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Dataloginsession.php', { params: parameter }).timeout(30000).subscribe((data : any) => {
      if(data.length > 0){

        data.map(item => {
          this.userId = item.id_siswa;
          window.localStorage.setItem('userid', this.userId);
        });
      }
      else{
        window.localStorage.removeItem('userid');
      }
    }, (error: any) => {
      window.localStorage.removeItem('userid');
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
        this.saveSession(this.login);
        this.doAuth();
      }
    });
  }

}
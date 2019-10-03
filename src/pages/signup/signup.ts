import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform, Events, ActionSheetController, 
  ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  authForm: FormGroup;

  foto: any;
  fullname: any;
  cardId: any;
  email: any;

  user_id: any;
  username: any;
  password: any;

  constructor(public navCtrl: NavController,
    private http: Http,
    public loading: LoadingController,
    public platform: Platform,
    public event: Events,
    public formBuilder: FormBuilder,
    public toast: ToastController,
    public action: ActionSheetController,
    public alert: AlertController,
    private camera: Camera,
    private transfer: FileTransfer) {

      this.authForm = formBuilder.group({
        fullname: ['', Validators.compose([Validators.required])],
        cardId: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email])],
        username: ['', Validators.compose([Validators.required])],
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

  navigationAction(){
    const confirm = this.alert.create({
      title: 'Information',
      message: 'Make sure your data is valid before submit.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            if(this.foto == "undefined" || this.foto == null || this.foto == ""){
              this.postDataWithoutImage();
            }
            else{
              this.postDataWithImage();
            }
          }
        }
      ],
      cssClass: 'alert-container',
      enableBackdropDismiss: false
    });
    confirm.present();
  }

  postDataWithoutImage(){
    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Creating account...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.user_id = Math.floor((Math.random() * 100) + 1);

    let firstParameter = "&user_id=" + this.user_id + "&fullname=" + this.fullname + "&cardId=" + this.cardId + "&email=" + this.email + "&null=";
    let secondParameter = "&user_id=" + this.user_id + "&username=" + this.username + "&password=" + this.password + "&null=";

    this.http.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/SignUpSiswa.php?view=insert", JSON.stringify(firstParameter), options).timeout(30000).subscribe(response => {
      if(response.status){
        this.http.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/SignUpLoginSiswa.php?view=insert", JSON.stringify(secondParameter), options).timeout(30000).subscribe(response => {
          if(response.status){
            loader.dismiss();
            this.event.publish('action:register');
            this.navCtrl.pop();
            swal ("Success!","Your account has been create!","success");
          }
          else{
            loader.dismiss();
            this.event.publish('action:register');
            swal ("Oops","Your account failed create!","error");
          }
        }, (error: any) => {
          loader.dismiss();
          this.event.publish('action:register');
          this.errorPopUp();
        });
      }
      else{
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Your account failed create!","error");
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

  postDataWithImage(){
    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded' );

    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: '<p style="color: #000;"><strong>Creating account...</strong></p>',
      enableBackdropDismiss: false
    });

    loader.present();

    this.user_id = Math.floor((Math.random() * 100) + 1);

    let firstParameter = "&user_id=" + this.user_id + "&fullname=" + this.fullname + "&cardId=" + this.cardId + "&email=" + this.email + "&null=";
    let secondParameter = "&user_id=" + this.user_id + "&username=" + this.username + "&password=" + this.password + "&null=";

    this.http.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/SignUpSiswa.php?view=insert", JSON.stringify(firstParameter), options).timeout(30000).subscribe(response => {
      if(response.status){
        this.http.post("https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/SignUpLoginSiswa.php?view=insert", JSON.stringify(secondParameter), options).timeout(30000).subscribe(response => {
          if(response.status){
            const fileTransfer: FileTransferObject = this.transfer.create();
            
            let options: FileUploadOptions = {
              fileKey: 'foto',
              fileName: 'UserPhoto_' + this.username + '.jpg',
              chunkedMode: false,
              mimeType: "image/jpeg",
              params: { id: this.user_id },
              headers: {}
            }
            
            fileTransfer.upload(this.foto, 'https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Uploadfotomahasiswa.php?view=update', options).then((data) => {
              if(data.response){
                loader.dismiss();
                this.event.publish('action:register');
                this.navCtrl.pop();
                swal ("Success!","Your account has been create!","success");
              }
              else{
                loader.dismiss();
                this.event.publish('action:register');
                swal ("Oops","Your account failed create!","error");
              }
            }, (error: any) => {
              loader.dismiss();
              this.event.publish('action:register');
              this.errorPopUp();
            });
          }
          else{
            loader.dismiss();
            this.event.publish('action:register');
            swal ("Oops","Your account failed create!","error");
          }
        }, (error: any) => {
          loader.dismiss();
          this.event.publish('action:register');
          this.errorPopUp();
        });
      }
      else{
        loader.dismiss();
        this.event.publish('action:register');
        swal ("Oops","Your account failed create!","error");
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
        this.navigationAction();
      }
    });
  }

  doSelectImageOption(){
    let modal = this.action.create({
      title: "Select image with",
      buttons: 
      [
        {
          text: 'Camera',
          icon: 'md-camera',
          handler: () => {
            this.getImageFromCamera();
          }
        },
        {
          text: 'Gallery',
          icon: 'md-images',
          handler: () => {
            this.getImageFromGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'md-close',
          handler: () => {
          }
        }
      ]
    });
    modal.present();
  }

  getImageFromCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (error: any) => {
      this.bottomToast();
    });
  }

  getImageFromGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (error: any) => {
      this.bottomToast();
    });
  }

  bottomToast(){
    let toast = this.toast.create({
      message: "Error when selecting image.",
      duration: 3000,
      position: "bottom",
      cssClass: "bottom-toast-image-picker"
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }

}
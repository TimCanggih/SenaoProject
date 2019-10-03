import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App, IonicApp, Events, Toast, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MainPage } from '../pages/main/main';
import { IntroPage } from '../pages/intro/intro';
import { SigninPage } from '../pages/signin/signin';

import swal from 'sweetalert';

import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  private toastInstance: Toast;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar,
    public menu: MenuController,
    public event: Events,
    private network: Network,
    private toast: ToastController,
    private app: App,
    private ionicApp: IonicApp) {
      this.eventNetwork();
      this.initializeApp();
      this.event.subscribe('action:register', () => {
        this.registerBackButtonAction();
      });
      this.event.publish('action:register');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.statusBar.backgroundColorByHexString('#44b4d5');
      this.menu.swipeEnable(false);
      this.checkSession();
    });
  }

  registerBackButtonAction(){
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();

      if(activePortal){
        activePortal.dismiss();
        return;
      }

      let view = this.nav.getActive();
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;

      if(!(page instanceof MainPage)){
        if(this.nav.canGoBack() || view && view.isOverlay){
          if(activeVC.name == 'MainPage'){
          }
          else{
            nav.pop();
          }
        }
        else{
        }
        return;
      }

      let tabs = this.app.getActiveNav();
      if(!tabs.canGoBack()){
        this.exitApp();
        nav.parent.select(0);
      }
      return tabs.pop();
    }, 0);
  }

  exitApp(){
    swal({
      title: "Are you sure ?",
      text: "this application will be close.",
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: ["No", "Yes"]
    })
    .then((willClose) => {
      if (willClose) {
        this.platform.exitApp();
      } 
      else {
      }
    });
  }

  checkSession(): void {
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null || window.localStorage.getItem('username') === "")
    && (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "")) {
      // this.nav.setRoot(IntroPage);
      this.nav.setRoot(SigninPage);
    }
    else {
      // this.nav.setRoot(MainPage);
      this.nav.setRoot(SigninPage);
    }
  }

  eventNetwork(){
    this.network.onConnect().subscribe(data => {
      this.event.subscribe('network:connect',() => {
        this.onConnectToast();
      });
      this.event.publish('network:connect');
    });
   
    this.network.onDisconnect().subscribe(data => {
      this.event.subscribe('network:disconnect',() => {
        this.onDisconnectToast();
      });
      this.event.publish('network:disconnect');
    });
  }

  onConnectToast(){
    if(this.toastInstance) {
      this.toastInstance.dismiss();
    }
    this.toastInstance = this.toast.create({
      message: "Back online",
      duration: 2000,
      position: "top",
      cssClass: "top-toast-network-connect"
    });
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
    this.toastInstance.present();
  }

  onDisconnectToast(){
    if(this.toastInstance) {
      return;
    }
    this.toastInstance = this.toast.create({
      message: "No connection",
      position: "top",
      cssClass: "top-toast-network-disconnect"
    });
    this.toastInstance.present();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
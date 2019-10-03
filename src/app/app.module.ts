import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { AcdetailPage } from '../pages/acdetail/acdetail';
import { AllcoursesPage } from '../pages/allcourses/allcourses';
import { CdetailPage } from '../pages/cdetail/cdetail';
import { ClassPage } from '../pages/class/class';
import { CoursesPage } from '../pages/courses/courses';
import { LearningPage } from '../pages/learning/learning';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { FpasswordPage } from '../pages/fpassword/fpassword';
import { RpasswordPage } from '../pages/rpassword/rpassword';
import { MainPage } from '../pages/main/main';
import { CprofilePage } from '../pages/cprofile/cprofile';
import { MycoursesPage } from '../pages/mycourses/mycourses';
import { SettingsPage } from '../pages/settings/settings';
import { RecordPage } from '../pages/record/record';
import { PaymentPage } from '../pages/payment/payment';
import { CommentPage } from '../pages/comment/comment';
import { CertificatePage } from '../pages/certificate/certificate';
import { ContactusPage } from '../pages/contactus/contactus';
import { GuidePage } from '../pages/guide/guide';
import { IntroPage } from '../pages/intro/intro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Network } from '@ionic-native/network';
import { ActionSheet } from '@ionic-native/action-sheet';
import { DatePicker } from '@ionic-native/date-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SearchmcPipe } from '../pipes/searchmc/searchmc';
import { SearchwPipe } from '../pipes/searchw/searchw';
import { SearchPipe } from '../pipes/search/search';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgAPI } from 'videogular2/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    AccountPage,
    AcdetailPage,
    AllcoursesPage,
    CdetailPage,
    ClassPage,
    CoursesPage,
    FpasswordPage,
    LearningPage,
    RpasswordPage,
    SigninPage,
    SignupPage,
    WishlistPage,
    MainPage,
    CprofilePage,
    MycoursesPage,
    SettingsPage,
    RecordPage,
    PaymentPage,
    CommentPage,
    CertificatePage,
    ContactusPage,
    GuidePage,
    IntroPage,

    SearchmcPipe,
    SearchwPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      animate: false
    }),
    BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    AccountPage,
    AcdetailPage,
    AllcoursesPage,
    CdetailPage,
    ClassPage,
    CoursesPage,
    FpasswordPage,
    LearningPage,
    RpasswordPage,
    SigninPage,
    SignupPage,
    WishlistPage,
    MainPage,
    CprofilePage,
    MycoursesPage,
    SettingsPage,
    RecordPage,
    PaymentPage,
    CommentPage,
    CertificatePage,
    ContactusPage,
    GuidePage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    EmailComposer,
    File,
    FileOpener,
    FileChooser,
    FilePath,
    Network,
    ActionSheet,
    DatePicker,
    FileTransfer,
    SocialSharing,
    ScreenOrientation,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VgAPI
  ]
})

export class AppModule {}
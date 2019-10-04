import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycoursesPage } from './mycourses';

@NgModule({
  declarations: [
    MycoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(MycoursesPage),
  ],
})

export class MycoursesPageModule {}
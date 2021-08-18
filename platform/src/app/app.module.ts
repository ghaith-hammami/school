import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main-structure/home/home.component';
import { CourcesComponent } from './main-structure/cources/cources.component';
import { ForumComponent } from './main-structure/forum/forum.component';
import { MainStructureComponent } from './main-structure/main-structure.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { StudentLoginComponent } from './login/student-login/student-login.component';
import { AdminPageComponent } from './main-structure/admin-page/admin-page.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { LandingPageComponent } from './landing-page/landing-page.component';

//firebase
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import 'firebase/storage';

//angular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { CourseFilesComponent } from './main-structure/course-files/course-files.component';
import { FilesListComponent } from './main-structure/files-list/files-list.component';
import { FileDetailsComponent } from './main-structure/file-details/file-details.component';
import { ClassControlComponent } from './main-structure/class-control/class-control.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourcesComponent,
    ForumComponent,
    MainStructureComponent,
    LoginComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    AdminPageComponent,
    ForumDetailsComponent,
    LandingPageComponent,
    CourseFilesComponent,
    FilesListComponent,
    FileDetailsComponent,
    ClassControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

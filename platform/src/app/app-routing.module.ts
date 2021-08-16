import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourcesComponent } from './main-structure/cources/cources.component';
import { ForumComponent } from './main-structure/forum/forum.component';
import { HomeComponent } from './main-structure/home/home.component';
import { MainStructureComponent } from './main-structure/main-structure.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { StudentLoginComponent } from './login/student-login/student-login.component';
import { AdminPageComponent } from './main-structure/admin-page/admin-page.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';




const routes: Routes = [
  {path:"welcome" ,component:LandingPageComponent},
  {path:"", redirectTo:'welcome',pathMatch:'full'},
  

  {path:"login", component:LoginComponent ,children:[
    {path:"", redirectTo:'student_login',pathMatch:'full'},
    {path:"admin_login" ,component:AdminLoginComponent},
    {path:"student_login" ,component:StudentLoginComponent}
  ]},
  
  {path:"platform", component:MainStructureComponent, children:[
    {path:"", redirectTo:'home',pathMatch:'full'},
    {path:"home", component:HomeComponent},
    {path:"courses", component:CourcesComponent},
    {path:"forum", component:ForumComponent},
    {path:"admin", component:AdminPageComponent},
  ]},
  
  {path:"forum_details", component:ForumDetailsComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

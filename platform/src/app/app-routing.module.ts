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
import { ClassControlComponent } from './main-structure/class-control/class-control.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [

  { path: "welcome", component: LandingPageComponent },
  { path: "", redirectTo: 'welcome', pathMatch: 'full' },

  {
    path: "login", component: LoginComponent, children: [
      { path: "", redirectTo: 'student_login', pathMatch: 'full' },
      { path: "admin_login", component: AdminLoginComponent },
      { path: "student_login", component: StudentLoginComponent }
    ]
  },

  {
    path: "platform",canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, component: MainStructureComponent, children: [
      { path: "", redirectTo: 'home', pathMatch: 'full' },
      { path: "home", component: HomeComponent },
      {
        path: "courses", children: [
          { path: ":subject", component: CourcesComponent },
          { path: "all", component: CourcesComponent },
          { path: "", redirectTo: "all", pathMatch: 'full' },
        ]
      },
      { path: "forum", children: [
        {path: ":key", component: ForumDetailsComponent},
        {path: "", component: ForumComponent}
      ] },
      { path: "admin",canActivate:[AuthGuard], component: AdminPageComponent },
      {
        path: "class_control", children: [
          { path: ":role", component: ClassControlComponent },
          { path: "", component: ClassControlComponent },
          { path: "**", redirectTo: "", pathMatch: "full" }
        ]
      }
    ]
  },

  { path: "forum_details", component: ForumDetailsComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

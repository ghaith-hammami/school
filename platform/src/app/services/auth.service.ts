import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogedin! :boolean; 

  constructor(public afAuth:AngularFireAuth,private router : Router) { }
  signIngoogle(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then(()=>{this.router.navigate(['platform' ])})
    this.isLogedin = true
  }

  facebooksignin(){
      const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup( facebookAuthProvider).then(()=>{this.router.navigate(['platform' ])});
      this.isLogedin = true
  }

  signOUT(){
    this.afAuth.signOut().then(()=>{this.router.navigate(['login' ])})
    this.isLogedin = false; 
  }

  Signin(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.isLogedin = true
            this.router.navigate(['platform' ]);
            resolve();
          },
          (error) => {
            reject(error);
            alert('wrong')
            
          }
        );
      }
    );
  }

}

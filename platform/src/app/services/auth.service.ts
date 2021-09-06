import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Admin } from '../model/Admin'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isAdmin!: boolean
  adminPath = "/admins"
  name!: any;
  profilePic: any

  adminRef: AngularFireList<Admin>
  admin!: boolean

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase) {
    this.adminRef = this.db.list(this.adminPath)
  }
  ngOnInit(): void {


  }

  getName() {
    if (firebase.auth().currentUser?.displayName === null) {
      this.name = "Admin"
    } else {
      this.name = firebase.auth().currentUser?.displayName
      this.profilePic = firebase.auth().currentUser?.photoURL
    }
  }

  getAdmin() {
    return this.adminRef
  }
  getRoomNumber(key: any) {
    return this.db.list(this.adminPath, ref => ref.orderByKey().equalTo(key));
  }
  getrole(role: string) {
    if (role == "admin") { return true }
    else { return false }


  }
  getAfmin(key: any) {
    this.getRoomNumber(key).snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as { "role": string } }))))
      .subscribe(res => {
        if (res.length !== 0) {
          for (let i of res) {
            this.isAdmin = this.getrole(i.role)
          }
        }
        else { this.isAdmin = false }

        return this.isAdmin

      })

  }



  signIngoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then(() => { this.router.navigate(['platform']) })

  }

  facebooksignin() {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(facebookAuthProvider).then(() => { this.router.navigate(['platform']) });


  }

  signOUT() {
    this.afAuth.signOut().then(() => { this.router.navigate(['welcome']) })

  }

  Signin(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {

            this.router.navigate(['platform']);
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

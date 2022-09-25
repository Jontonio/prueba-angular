import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
              public _auth:AuthService,
              public auth: AngularFireAuth,
              private router:Router) {

    this.loginForm = this.fb.group({
      email:[null, [Validators.email, Validators.required]],
      password:[null, Validators.required ]
    })

  }

  ngOnInit(): void {
  }

  ingresar(){

    if(this.loginForm.invalid) return;

    this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then( res => {
      console.log(res)
      this.router.navigateByUrl("/admin");
    }).catch( err => {

      console.log(err);

    })

  }

  loginConGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( res => {
      console.log(res)
      this.router.navigateByUrl("/admin");
    }).catch( err => {

      console.log(err);

    })
  }

  active(){

    this.auth.currentUser.then( res => {
      console.log(res)
    }).catch( err => {

      console.log(err);

    })
  }

  logout(){
    this.auth.signOut()
  }


}

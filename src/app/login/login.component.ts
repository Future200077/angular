import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {UserAuthService} from '../user-auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email:string=''
  password:string=''
  isSubmitting:boolean = false
  validationErrors:Array<any> = []

  constructor(public userAuthService: UserAuthService, private router:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard')
    }
  }

  loginAction() {
    this.isSubmitting = true;
    let payload = {
      email:this.email,
      password: this.password,
    }
    this.userAuthService.login(payload)
    .then(({data})=>{
      localStorage.setItem('token', data.token)
      this.router.navigateByUrl('/dashboard')

      return data
    }).catch(error => {
      this.isSubmitting = false;
      if(error.response.data.errors != undefined){
        this.validationErrors = error.response.data.message
      }
      if(error.response.data.error != undefined) {
        this.validationErrors = error.response.data.error
      }
      return error
    })
  }
}


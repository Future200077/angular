import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { User } from '../user/user';
 
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user!:User
  constructor(public userAuthService: UserAuthService, private router: Router) {}
  
  ngOnInit(): void {
   if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.router.navigateByUrl('/')
    }else {
      this.userAuthService.getUser().then(({data})=>{
        this.user = data;
      })
    }
  }
  
  logoutAction () {
    this.userAuthService.logout().then(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    }).catch(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    })
    
  }
}
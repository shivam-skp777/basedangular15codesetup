import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 constructor(private router:Router,private main : MainService){

 }

 ngOnInit(): void {
   
 }
 change(lang:string){
  this.main.changeLanguage(lang);
}

 login(){
   localStorage.setItem('login','true');
    // this.router.navigate(['/auth/home'])
 }
}

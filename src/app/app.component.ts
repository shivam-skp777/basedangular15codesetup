import { Component } from '@angular/core';
import { NavigationEnd, Router,Event } from '@angular/router';
import { MainService } from './main.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';
  currUrl: any;
  url:any;
  constructor(private routes:Router, private main:MainService, private sanitizer : DomSanitizer){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://extranetcloud.marriott.com/2FAmarrsso/idp/SSO.saml2');
    routes.events.subscribe( (event: Event) => {
    if(event instanceof NavigationEnd) {
     let currUrl = event.url.split('/')[1];
     if(localStorage.getItem('login')=='true') {   
      if((currUrl == `un-auth`)) {
          this.routes.navigate([`/auth/home`])
            }
    } else {
        if(currUrl == `auth`) {
        this.routes.navigate([`/un-auth/login`])
      }
   }
   }
 })
  }

  change(lang:string){
    this.main.changeLanguage(lang);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messageList: any=[];
  newMessage: any='';

  constructor(private router:Router,private main:MainService, private socketService: SocketService,private activatedRoute: ActivatedRoute){

  }
 
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if(data){
        console.log("Activated Route",data)
      }
  })
    this.socketService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
    // this.getApiTest();
    
  }

  sendMessage() {
    this.socketService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  change(lang:string){
    this.main.changeLanguage(lang);
  }

  getApiTest(){
   this.main.get('posts').subscribe(x=>{
     if(x){
      // console.log(JSON.stringify(x));
     }
   },err=>{
    // console.log(err);
   })
  }
 
  logout(){
    localStorage.setItem('login','false');
    //  this.router.navigate(['/un-auth/login'])
  }
}

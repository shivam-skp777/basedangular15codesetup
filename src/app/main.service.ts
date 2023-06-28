import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private toastr: ToastrService,private translate: TranslateService) {
    // translate.setDefaultLang('jp');
    // this.changeLanguage('jp')

   }

   /*****************************Change Translation Language **********************/
   changeLanguage(lang:string){
    this.translate.use(lang)
   }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  showSuccess(message:string, title:string) {
    this.toastr.success(message, title)
  }

  showError(message:string, title:string) {
    this.toastr.error(message, title)
  }

  showInfo(message:string, title:string) {
    this.toastr.info(message, title)
  }

  showWarning(message:string, title:string) {
    this.toastr.warning(message, title)
  }
  /*************** Post Api *********************/
  post(endPoint: string, data: any): Observable<any> {
    return this.http.post(this.baseUrl + endPoint, data);
  }
  /********************* Get Api ******************/
  get(endPoint: any): Observable<any> {
    return this.http.get(this.baseUrl + endPoint);
  }
}

/****************** Interceptor Integration **********/
@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor(public route: Router, public serverRepo: MainService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

    // if (localStorage.getItem('token'))
    //   req = req.clone({ headers: req.headers.set('x-access-token', localStorage.getItem("token")) });

    // if (localStorage.getItem('user_id'))
    //   req = req.clone({ headers: req.headers.set('user_id', localStorage.getItem("user_id")) });


    return next.handle(req).pipe(tap(res => {
      this.serverRepo.showSpinner();
      if (res instanceof HttpResponse) {
        console.log('response==>>>', JSON.stringify(res));
        this.serverRepo.hideSpinner();
        if (res['status'] != 200) {
          if (res['status'] == 401 || res['status'] == 403) {
            localStorage.clear();
            this.serverRepo.showError(res['body']['message'],'Neutron');
            // this.route.navigate(['/landing/login']);
          }
          else if (res['status'] == 500){
            console.log('---> 500')
            this.serverRepo.showError(res['body']['message'],'Neutron');
            }
            else{
            console.log('---> errrrr')
            this.serverRepo.showError(res['body']['message'],'Neutron');
          }
        }else{
          this.serverRepo.showSuccess(res['body']['message'],'Neutron');
          if (res['body']['token']) {
            localStorage.setItem('token', res['body']['token'])
            // localStorage.setItem('user_id', res['body']['result']['_id'])
            //localStorage.setItem('user', JSON.stringify(res['body']['result']));
          }
        }        
      }
    }, err => {
      this.serverRepo.hideSpinner();
      if (err instanceof HttpErrorResponse) {
        console.log('---> err', JSON.stringify(err))
        this.serverRepo.showError('Something went wrong!','Neutron');
      }
    }));
  }
}



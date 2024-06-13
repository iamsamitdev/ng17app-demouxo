import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // ตัวแปรสำหรับเก็บ URL ของ API
  private apiURL = environment.baseURLAPI

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  // ฟังก์ชัน loginService
  loginService(data: any) {
    return this.http.post(
      this.apiURL + 'Authenticate/login',
      data,
      this.httpOptions
    )
  }

  // ฟังก์ชัน registerService
  registerService(data: any) {
    return this.http.post(
      this.apiURL + 'Authenticate/register-user',
      data,
      this.httpOptions
    )
  }
  
}

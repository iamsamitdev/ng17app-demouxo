import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  // ตัวแปรสำหรับเก็บ URL ของ API
  private apiURL = environment.baseURLAPI

  // อ่านค่า Token จาก Local Storage
  token = localStorage.getItem('token');

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  // Heaeders for Form Data
  httpOptionsFormData = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  }

  constructor(
    private http: HttpClient
  ) { }
  // Get All Products
  getAllProducts() {
    return this.http.get(
      this.apiURL + 'Product?page=1&limit=100',
      this.httpOptions
    )
  }

  // Add new Product
  addProduct(data: any) {
    return this.http.post(
      this.apiURL + 'Product',
      data,
      this.httpOptionsFormData
    )
  }

  
}

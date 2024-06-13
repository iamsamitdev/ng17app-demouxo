import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';

// SweetAlert2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // FormGroup
  loginForm!: FormGroup;
  // ตัวแปรไว้ตรวจว่ามีการ Submit หรือไม่
  submitted = false;

  // ตัวแปรไว้เก็บค่าจากฟอร์ม
  userLogin = {
    "username": "",
    "password": ""
  }

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthServiceService
  ) {}

  // กำหนดค่าเริ่มต้นให้กับ FormBuilder
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ฟังก์ชันสำหรับการเข้าสู่ระบบ
  submitLogin() {
    // กำหนดค่า submitted เป็น true
    this.submitted = true;
    // เช็คว่าฟอร์มถูกต้องหรือไม่
    if(this.loginForm.invalid){
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      // นำค่าจากฟอร์มมาเก็บไว้ในตัวแปร
      this.userLogin.username = this.loginForm.value.username;
      this.userLogin.password = this.loginForm.value.password;

      // เช็คการ login ด้วย Service
      this.auth.loginService(this.userLogin).subscribe({
        next: (data: any) => {
          console.log(data);
          Swal.fire({
            title: 'Success!',
            text: 'Login Success',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Login Fail',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }) 
    }
  }

  // ฟังก์ชันสำหรับการล้างข้อมูล
  resetLogin(){
    this.submitted = false;
    this.loginForm.reset();
  }

}

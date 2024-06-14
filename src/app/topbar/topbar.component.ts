import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  constructor(
    private router: Router
  ) {}

  Logout() {
    // ลบ Token ออกจาก Local Storage
    localStorage.removeItem('token');
    // ส่งไปหน้า Login
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // ตัวแปรใน component
  title = 'ng17app-demo';
  price = 100;
  mylogo = "assets/images/logo.png";

  num_a = 0
  num_b = 0

  // สร้างฟังก์ชันการกดปุ่ม
  onClick() {
    alert('Hello Angular 17');
  }

}

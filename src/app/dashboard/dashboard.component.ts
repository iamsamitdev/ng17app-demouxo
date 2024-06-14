import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
[x: string]: any;

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้าที่ดึงมาจาก API
  products: any[] = []

  // สร้างตัวแปรไว้รับค่าจากฟอร์ม
  formGroupProduct!: FormGroup

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้าที่จะเพิ่มผ่าน API
  formProduct: any = {
    productname: '',
    unitprice: 0,
    productpicture: 'noimg.jpg',
    categoryid: 1,
    unitinstock: 0,
    createddate: '2021-01-01T00:00:00',
    modifieddate: '2021-01-01T00:00:00'
  }

  constructor(
    private productService: ProductServiceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.formGroupProduct = this.formBuilder.group({
      productname: [''],
      unitprice: [''],
      categoryid: [''],
      unitinstock: ['']
    });

    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data.products)
        this.products = data.products
      },
      error: (error: any) => {
        console.error(error)
      }
    }) 

  }

  // Submit Form
  submitProduct() {
    if(this.formGroupProduct.invalid){
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    } else {
      this.formProduct.productname = this.formGroupProduct.value.productname
      this.formProduct.unitprice = this.formGroupProduct.value.unitprice
      this.formProduct.categoryid = this.formGroupProduct.value.categoryid
      this.formProduct.unitinstock = this.formGroupProduct.value.unitinstock

      // แปลงข้อมูลเป็น form data
      const formData: any = new FormData()

      // วนลูปดูค่าที่อยู่ใน formProduct
      for (const key in this.formProduct) {
        formData.append(key, this.formProduct[key])
      }

      // วนลูปดูค่าที่อยู่ใน formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }

      // บันทึกข้อมูลผ่าน API
      this.productService.addProduct(formData).subscribe({
        next: (data: any) => {
          console.log(data)
          alert('บันทึกข้อมูลสำเร็จ')
          // reset form
          this.formGroupProduct.reset()
        },
        error: (error: any) => {
          console.error(error)
          alert('บันทึกข้อมูลไม่สำเร็จ')
        }
      })

    }
  }

}

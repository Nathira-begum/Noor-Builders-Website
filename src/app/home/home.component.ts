import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  validateForm!: FormGroup;
  locations = ['Pollachi', 'Coimbatore', 'Karur', 'Dindigul'];
  images = [
    'assets/img1.jpeg',
    'assets/img2.jpeg',
    // 'assets/img3.jpeg',
    'assets/img4.jpeg',
    // 'assets/img5.jpeg',
    // 'assets/img6.jpeg',
    'assets/img7.jpeg',
    'assets/img8.jpeg',
    // 'assets/img9.jpeg',
  ];
  currentIndex = 0;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      landAreaInput: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      requirement: [''],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form Submitted!', this.validateForm.value);
    } else {
      console.log('Form is not valid!');
      for (const i in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(i)) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  reloadHomePage(event: Event): void {
    event.preventDefault();
    this.router.navigateByUrl('/');
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

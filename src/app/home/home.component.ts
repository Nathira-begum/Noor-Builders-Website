import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 👈 import HttpClient
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  validateForm!: FormGroup;
  locations = ['Pollachi', 'Coimbatore', 'Karur', 'Dindigul'];
  images = [
    'assets/img2.jpeg',
    'assets/img4.jpeg',
    'assets/img7.jpeg',
    'assets/img8.jpeg',
  ];
  currentIndex = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // 👈 inject HttpClient
    private router: Router
  ) {}

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

  ngAfterViewInit() {
    const items = document.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;

      this.http.post('http://localhost:5000/api/contact', formData).subscribe({
        next: (res: any) => {
          alert('✅ Your details have been submitted successfully!');
          this.validateForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Something went wrong. Please try again.');
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

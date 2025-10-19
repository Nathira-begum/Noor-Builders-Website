import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      landAreaInput: ['', Validators.required],
      requirement: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.http.post('http://localhost:5000/api/contact', this.contactForm.value)
      .subscribe({
        next: (res: any) => {
          alert('✅ Form submitted successfully!');
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('❌ Submission error:', err);
          alert('❌ Failed to send form. Please try again.');
          this.isSubmitting = false;
        }
      });
  }
}

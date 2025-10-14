import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false; // 👈 Track loading state
  messageStatus: 'success' | 'error' | null = null; // 👈 For showing message

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      service: ['', Validators.required],
      message: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.contactForm.value),
      })
        .then((res) => res.json())
        .then((data) => {
          this.messageStatus = 'success';
          alert('✅ Message sent successfully!');
          this.contactForm.reset({
            service: '', // Reset dropdown to "Select a service"
          });
        })
        .catch((err) => {
          console.error(err);
          this.messageStatus = 'error';
          alert('❌ Failed to send message.');
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    } else {
      this.contactForm.markAllAsTouched(); // Highlight invalid fields
    }
  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  validateForm!: FormGroup;

  locations = ['Pollachi', 'Coimbatore', 'Karur', 'Dindigul'];

  // ==============================
  // PROJECT IMAGES
  // ==============================

  images = [
    'assets/img1.jpeg',
    'assets/img2.jpeg',
    'assets/img12.jpeg',
    'assets/img3.jpeg',
    'assets/img4.jpeg',
    'assets/img5.jpeg',
    'assets/img6.jpeg',
    'assets/img7.jpeg',
    'assets/img8.jpeg',
    'assets/img9.jpeg',
    'assets/img10.jpeg',
    'assets/img11.jpeg',
  ];

  // ==============================
  // VIDEOS
  // ==============================

  videos = [
    'assets/video1.mp4',
    'assets/video2.mp4',
    'assets/video3.mp4',
    'assets/video4.mp4',
    'assets/video5.mp4',
    'assets/video6.mp4',
    'assets/video7.mp4',
    'assets/video8.mp4',
  ];

  // ==============================
  // VENDORS
  // ==============================

  showAllVendors = false;
  initialVendorCount = 12;

  vendors = [
    { img: 'assets/pulkit.jpeg', name: 'Pulkit TMT' },
    { img: 'assets/vizag.jpeg', name: 'Vizag TMT' },
    { img: 'assets/jsw.jpeg', name: 'JSW TMT' },
    { img: 'assets/tata.jpeg', name: 'TATA TMT' },
    { img: 'assets/chettinad.jpeg', name: 'Chettinad Cement' },
    { img: 'assets/ramco.jpeg', name: 'Ramco Cement' },
    { img: 'assets/ultratech.jpeg', name: 'UltraTech Cement' },
    { img: 'assets/msand.jpeg', name: 'M Sand' },
    { img: 'assets/psand.jpeg', name: 'P Sand' },
    { img: 'assets/flyash.jpeg', name: 'Fly Ash' },
    { img: 'assets/aac.jpeg', name: 'AAC Blocks' },
    { img: 'assets/chamber.jpeg', name: 'Chamber Bricks' },
    { img: 'assets/wirecut.jpeg', name: 'Wirecut Bricks' },
    { img: 'assets/kundan.jpeg', name: 'Kundan Cable' },
    { img: 'assets/kundancab.jpeg', name: 'Kundan CAB' },
    { img: 'assets/finolex-gold.jpeg', name: 'Finolex Gold' },
    { img: 'assets/legrand.jpeg', name: 'Legrand' },
    { img: 'assets/gm.jpeg', name: 'GM' },
    { img: 'assets/schneider.jpeg', name: 'Schneider' },
    { img: 'assets/leoplast.jpeg', name: 'Leo Plast' },
    { img: 'assets/finolex.jpeg', name: 'Finolex' },
    { img: 'assets/supreme.jpeg', name: 'Supreme' },
    { img: 'assets/astral.jpeg', name: 'Astral Pipes' },
    { img: 'assets/parryware.jpeg', name: 'Parryware' },
    { img: 'assets/opus1.jpeg', name: 'Opus' },
    { img: 'assets/drfixit.jpeg', name: 'Dr Fixit' },
    { img: 'assets/asian.jpeg', name: 'Asian Paints' },
    { img: 'assets/nippon.jpeg', name: 'Nippon Paint' },
  ];

  currentIndex = 0;
  visibleCards = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  // =====================================================
  // PROJECT DRAG SCROLL
  // =====================================================

  @ViewChild('carousel', { static: false })
  carousel!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  startDrag(event: MouseEvent) {
    this.isDragging = true;

    this.startX = event.pageX - this.carousel.nativeElement.offsetLeft;

    this.scrollLeft = this.carousel.nativeElement.scrollLeft;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    event.preventDefault();

    const x = event.pageX - this.carousel.nativeElement.offsetLeft;

    const walk = (x - this.startX) * 2;

    this.carousel.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  stopDrag() {
    this.isDragging = false;
  }

  // =====================================================
  // VIDEO DRAG SCROLL
  // =====================================================

  @ViewChild('videoCarousel', { static: false })
  videoCarousel!: ElementRef;

  isVideoDragging = false;
  videoStartX = 0;
  videoScrollLeft = 0;

  startVideoDrag(event: MouseEvent) {
    this.isVideoDragging = true;

    this.videoStartX =
      event.pageX - this.videoCarousel.nativeElement.offsetLeft;

    this.videoScrollLeft = this.videoCarousel.nativeElement.scrollLeft;
  }

  onVideoDrag(event: MouseEvent) {
    if (!this.isVideoDragging) return;

    event.preventDefault();

    const x = event.pageX - this.videoCarousel.nativeElement.offsetLeft;

    const walk = (x - this.videoStartX) * 2;

    this.videoCarousel.nativeElement.scrollLeft = this.videoScrollLeft - walk;
  }

  stopVideoDrag() {
    this.isVideoDragging = false;
  }

  // =====================================================
  // NEXT BUTTON
  // =====================================================

  nextImage() {
    if (this.currentIndex >= this.images.length - this.visibleCards) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  // =====================================================
  // PREVIOUS BUTTON
  // =====================================================

  prevImage() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.images.length - this.visibleCards;
    } else {
      this.currentIndex--;
    }
  }

  // ==============================
  // SHOW MORE / LESS VENDORS
  // ==============================

  toggleVendors() {
    this.showAllVendors = !this.showAllVendors;
  }
  // =====================================================
  // ON INIT
  // =====================================================

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

  // =====================================================
  // AFTER VIEW INIT
  // =====================================================

  ngAfterViewInit() {
    const items = document.querySelectorAll('.gallery-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    items.forEach((item) => observer.observe(item));
  }

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;

      this.http.post('http://localhost:5000/api/contact', formData).subscribe({
        next: () => {
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
}

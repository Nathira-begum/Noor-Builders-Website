import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const images = document.querySelectorAll('.hero-images img');
    const text = document.querySelector('.hero-banner-text') as HTMLElement;
    let currentIndex = 0;

    if (images.length > 0) {
      images[0].classList.add('active');
    }

    setInterval(() => {
      if (images.length === 0) return;

      text.classList.add('fade');
      images[currentIndex].classList.remove('active');

      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');

      setTimeout(() => text.classList.remove('fade'), 500);
    }, 2000); // every 2 seconds
  }
}

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

    setInterval(() => {
      // Fade out text
      text.classList.add('fade');

      // Fade out current image
      images[currentIndex].classList.remove('active');

      // Move to next image
      currentIndex = (currentIndex + 1) % images.length;

      // Fade in next image
      images[currentIndex].classList.add('active');

      // Fade text back in
      setTimeout(() => text.classList.remove('fade'), 500);
    }, 2000); // changes every 2 seconds
  }
}

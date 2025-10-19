import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const images = document.querySelectorAll('.hero-images img');
    let currentIndex = 0;

    if (images.length > 0) {
      images[0].classList.add('active');
    }

    setInterval(() => {
      if (images.length === 0) return;

      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, 2000); // change every 2s
  }
}

import { Component } from '@angular/core';

interface Project {
  title: string;
  image: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  categories: string[] = [
    'All Projects',
    'Residential',
    'Commercial',
    'Planning & Design'
  ];

  selectedCategory = 'All Projects';

  // Completed project gallery
  projects: Project[] = [
    {
      title: 'Modern Villa',
      image: 'assets/img1.jpeg',
      category: 'Residential',
      description: 'Modern architecture with elegant exterior design.'
    },
    {
      title: 'Residential House',
      image: 'assets/img2.jpeg',
      category: 'Residential',
      description: 'Beautiful home design with functional spaces.'
    },
    {
      title: 'Duplex House',
      image: 'assets/img3.jpeg',
      category: 'Residential',
      description: 'Contemporary design with a stylish elevation.'
    },
    {
      title: 'Individual Home',
      image: 'assets/img4.jpeg',
      category: 'Residential',
      description: 'A thoughtfully designed individual residence.'
    },
    {
      title: 'Luxury Villa',
      image: 'assets/img5.jpeg',
      category: 'Residential',
      description: 'A distinctive home with modern architectural details.'
    },
    {
      title: 'Commercial Complex',
      image: 'assets/img6.jpeg',
      category: 'Commercial',
      description: 'A practical design for commercial spaces.'
    },
    {
      title: 'Architectural Design',
      image: 'assets/img7.jpeg',
      category: 'Planning & Design',
      description: 'Architectural concepts shaped around client needs.'
    },
    {
      title: 'Building Design',
      image: 'assets/img8.jpeg',
      category: 'Planning & Design',
      description: 'Carefully planned building layouts and elevations.'
    },
    {
      title: 'Contemporary Home',
      image: 'assets/img9.jpeg',
      category: 'Residential',
      description: 'A contemporary design with a clean finish.'
    }
  ];

  // Separate ongoing-project gallery.
  // Replace these entries with projects actually under construction.
  ongoingProjects: Project[] = [
    {
      title: 'Residential Villa',
      image: 'assets/img5.jpeg',
      category: 'Residential',
      description: 'Residential construction project.'
    },
    {
      title: 'Building Construction',
      image: 'assets/img6.jpeg',
      category: 'Commercial',
      description: 'Building project currently in progress.'
    },
    {
      title: 'Individual House',
      image: 'assets/img7.jpeg',
      category: 'Residential',
      description: 'Individual home construction project.'
    },
    {
      title: 'Modern Residence',
      image: 'assets/img8.jpeg',
      category: 'Residential',
      description: 'Residential building project.'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All Projects') {
      return this.projects;
    }

    return this.projects.filter(
      project => project.category === this.selectedCategory
    );
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
  }
}
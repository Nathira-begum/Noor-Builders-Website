import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  animations: [
    trigger('scaleIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('1s ease-in', style({ opacity: 1 }))]),
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter', [
        animate('1s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('slideInDown', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class AboutusComponent {
  ser = [
    {
      title: 'Architecture Plan',
      description:
        'Designing innovative and sustainable buildings that stand out in both form and function. From conceptualization to execution, we provide comprehensive architectural services. We work closely with clients to ensure that the final design aligns with their vision and requirements.',
      img: 'assets/structuraldesign.jpeg',
    },
    {
      title: 'Structural Design',
      description:
        'We provide cutting-edge structural design solutions that ensure the safety, durability, and efficiency of your building projects. We utilize the latest design software and technology to create precise and optimized structural plans that meet your specific requirements.',
      img: 'assets/structuraldesign.jpeg',
    },
    {
      title: 'Elevation',
      description:
        'We integrates cutting-edge architectural designs that enhance the aesthetic appeal and functionality of structures, ensuring that every elevation not only meets but exceeds modern standards. We offer tailored elevation solutions based on the client preferences, architectural style, and the specific needs of the building, ensuring a unique and personalized touch.',
      img: 'assets/elevation1.jpeg',
    },
    {
      title: 'Building Approval',
      description:
        'Securing necessary approvals and permits for your construction projects.  We ensure that all building plans meet the necessary regulatory requirements for approval. We handle the submission of plans and follow up with authorities to expedite the approval process.',
      img: 'assets/approved.jpeg',
    },
    {
      title: 'Estimation and Costing',
      description:
        'Accurate cost estimation to ensure your project stays within budget. We provide accurate cost estimates to help you plan your budget effectively. We provide a detailed estimate of material costs to help you understand the financial aspects.',
      img: 'assets/estimation2.jpeg',
    },
    {
      title: 'Construction',
      description:
        'Efficiently overseeing and coordinating construction projects from inception to completion. Our rigorous quality control processes ensure that every aspect of the construction meets industry standards. We deliver projects on time, leveraging our expertise and efficient project management techniques.',
      img: 'assets/construction10.jpeg',
    },
    {
      title: 'TurnKey Projects',
      description:
        'Complete end-to-end construction solutions from planning and design to final handover. We ensure quality, timely delivery, and hassle-free project execution.',
      img: 'assets/turnkey.jpeg',
    },
    {
      title: 'Project Management Consulting',
      description:
        'Delivering expert project management solutions for seamless construction execution. We ensure quality, efficiency, and on-time completion from start to finish.',
      img: 'assets/construction1.jpeg',
    },
    {
      title: 'Renovation',
      description:
        'Transforming spaces to meet your evolving needs while enhancing functionality and aesthetics. We use high-quality materials to ensure the longevity and durability of your renovations. Our commitment to customer satisfaction ensures that your renovation project exceeds your expectations.',
      img: 'assets/renovation1.jpeg',
    },

    {
      title: 'Interior Design',
      description:
        'Creating beautiful, functional interiors that reflect your personal style and requirements. We use high-quality materials and finishes to create luxurious and durable interiors that stand the test of time.',
      img: 'assets/interior8.jpeg',
    },

    {
      title: 'Planning & Consultancy',
      description:
        'Detailed planning and scheduling to ensure timely and within-budget project completion. Providing expert advice and solutions to optimize your construction projects.',
      img: 'assets/planning.jpeg',
    },
  ];

  services = [
    {
      title: 'Professionally Run Construction Company',
      description:
        'Experienced professionals delivering quality construction services.',
      icon: 'tool',
    },
    {
      title: 'Government Approvals',
      description: 'Complete assistance with approvals and documentation.',
      icon: 'file-done',
    },
    {
      title: 'Complete Design Solutions',
      description: 'Architecture, structural and interior solutions.',
      icon: 'build',
    },
    {
      title: 'Strong Business Ethics',
      description: 'Transparency and honesty in every project.',
      icon: 'safety-certificate',
    },
    {
      title: 'On-Time Delivery',
      description: 'Projects completed within committed timelines.',
      icon: 'field-time',
    },
    {
      title: '100% Transparency',
      description: 'Clear communication throughout the project.',
      icon: 'audit',
    },
    {
      title: 'Experienced Team',
      description: 'Qualified engineers and skilled professionals.',
      icon: 'team',
    },
    {
      title: 'Quality Assurance',
      description: 'Strict quality checks at every stage.',
      icon: 'verified',
    },
  ];
}

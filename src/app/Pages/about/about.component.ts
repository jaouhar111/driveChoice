import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { PopularCarsComponent } from '../../Components/popular-cars/popular-cars.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    PopularCarsComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  features = [
    {
      icon: 'battery',
      title: 'Advanced Battery Technology',
      description:
        'State-of-the-art battery systems for extended range and performance.',
    },
    {
      icon: 'wifi',
      title: 'Seamless Connectivity',
      description:
        'Stay connected with advanced infotainment and smart features.',
    },
    {
      icon: 'lightbulb',
      title: 'Intelligent Charging Solutions',
      description:
        'Efficient charging options for home and on-the-go convenience.',
    },
    {
      icon: 'shield',
      title: 'Enhanced Safety Features',
      description: 'Cutting-edge safety technologies for peace of mind.',
    },
  ];

  accordionItems = [
    {
      id: '01',
      title: 'Eco-Friendly Performance',
      content:
        'Experience powerful acceleration and smooth driving without compromising the environment.',
    },
    {
      id: '02',
      title: 'Advanced Technology',
      content:
        'Cutting-edge features including autonomous driving capabilities and smart connectivity.',
    },
    {
      id: '03',
      title: 'Exceptional Efficiency',
      content:
        'Maximized range and energy utilization for fewer stops and more exploration.',
    },
    {
      id: '04',
      title: 'Innovative Design',
      content:
        'Sleek aerodynamics meet luxurious comfort in our revolutionary vehicle designs.',
    },
  ];

  vehicleLineup = [
    {
      name: 'Model S',
      image: 'https://picsum.photos/800/450?random=1',
      description: 'Luxury sedan with unparalleled performance',
    },
    {
      name: 'Model X',
      image: 'https://picsum.photos/800/450?random=2',
      description: 'Versatile SUV for the modern family',
    },
    {
      name: 'Roadster',
      image: 'https://picsum.photos/800/450?random=3',
      description: 'The future of sports cars is here',
    },
  ];
}

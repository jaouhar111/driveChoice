import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarBrand } from '../../Interfaces/carbrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  carBrands: CarBrand[] = [
    {
      id: 1,
      name: 'Mercedes_Benz',
      imageUrl:
        'https://www.mercedes-benz.fr/content/france/fr/passengercars/models/estate/s214-24-1/amg/_jcr_content/root/responsivegrid/text_media_module/image.component.damq5.3426005828626.jpg/mercedes-amg-e-class-estate-s214-special-edition-01-1884x1884-02-2024.jpg',
    },

    {
      id: 3,
      name: 'Audi',
      imageUrl:
        'https://w0.peakpx.com/wallpaper/37/840/HD-wallpaper-audi-r8-v10-2018-8k-audi-r8-audi-cars-2018-cars.jpg',
    },
    {
      id: 4,
      name: 'Porsche',
      imageUrl:
        'https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/jdp-2016-982-718-bo-gallery-exterior-09/zoom2/4fddeb78-b6bb-11ed-80fb-005056bbdc38;sM;twebp/porsche-zoom2.webp',
    },
    {
      id: 5,
      name: 'Lamborghini',
      imageUrl:
        'https://www.metalplatepictures.com/media/catalog/product/cache/402d204cd04085346d874a3de4cc24af/1/_/1_7333.png',
    },
  ];
}

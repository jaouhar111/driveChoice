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
      icon:'https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg',
      imageUrl:
        'https://www.mercedes-benz.fr/content/france/fr/passengercars/models/estate/s214-24-1/amg/_jcr_content/root/responsivegrid/text_media_module/image.component.damq5.3426005828626.jpg/mercedes-amg-e-class-estate-s214-special-edition-01-1884x1884-02-2024.jpg',
    },

    {
      id: 3,
      name: 'Audi',
      icon:'https://cdn.worldvectorlogo.com/logos/audi-13.svg',
      imageUrl:
        'https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/43000/400/70/rs3-34.jpg',
    },
    {
      id: 4,
      name: 'Porsche',
      icon:'https://cdn.worldvectorlogo.com/logos/porsche-2.svg',
      imageUrl:
        'https://4kwallpapers.com/images/walls/thumbs_3t/12971.jpg',
    },
    {
      id: 5,
      name: 'Lamborghini',
      icon:'https://cdn.worldvectorlogo.com/logos/lamborghini.svg',
      imageUrl:
        'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2024/08_16_temerario/over/temerario.jpg',
    },
  ];
}

import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CarDetailComponent } from './Pages/car-detail/car-detail.component';
import { PaiementFormComponent } from './Pages/paiement-form/paiement-form.component';
import { TestdriveFormComponent } from './Pages/testdrive-form/testdrive-form.component';
import { CarCollectionComponent } from './Pages/car-collection/car-collection.component';
import { DashCarComponent } from './Components/dash-car/dash-car.component';
import { DashMessageComponent } from './Components/dash-message/dash-message.component';
import { BordComponent } from './Components/bord/bord.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { authGuardGuard } from './Guards/auth.guard';
import { FaqComponent } from './Pages/faq/faq.component';
import { AboutComponent } from './Pages/about/about.component';
import { FeaturesComponent } from './Pages/features/features.component';
import { DashPaiementComponent } from './Components/dash-paiement/dash-paiement.component';
import { ArchievComponent } from './Components/archiev/archiev.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'feature', component: FeaturesComponent },
  { path: 'list', component: CarCollectionComponent },
  { path: 'list/:brand', component: CarCollectionComponent },
  { path: 'testDrive/:id', component: TestdriveFormComponent },
  { path: 'paiement/:id', component: PaiementFormComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'bord', component: BordComponent },
      { path: 'car', component: DashCarComponent },
      { path: 'paiement', component: DashPaiementComponent },
      { path: 'archiev', component: ArchievComponent },
      { path: 'message', component: DashMessageComponent },
    ],
  },
  { path: 'car/:id', component: CarDetailComponent },
  { path: '**', component: NotFoundComponent },
];

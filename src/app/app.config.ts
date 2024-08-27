import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'car-ecommerce-9077e',
        appId: '1:432223357259:web:9ae44f871129e2e52f40ce',
        databaseURL:
          'https://car-ecommerce-9077e-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'car-ecommerce-9077e.appspot.com',
        apiKey: 'AIzaSyAAzg7gcg8_TZwrAos-X6SdqiHASqogU8M',
        authDomain: 'car-ecommerce-9077e.firebaseapp.com',
        messagingSenderId: '432223357259',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
};

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../Interfaces/car';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { TestDrive } from '../Interfaces/testDrive';
import { Paiement } from '../Interfaces/Paiement';

@Injectable({
  providedIn: 'root',
})
export class CarDealershipServiceService {
  constructor(
    private firestore: Firestore // private storage: Storage
  ) {}
  getCars(): Observable<Car[]> {
    const carsCollection = collection(this.firestore, 'cars');
    return collectionData(carsCollection, { idField: 'id' }) as Observable<
      Car[]
    >;
  }

  getCarById(id: string): Observable<Car> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return docData(carDocRef, { idField: 'id' }) as Observable<Car>;
  }

  addCar(car: any) {
    const carsCollection = collection(this.firestore, 'cars');
    return addDoc(carsCollection, car);
  }

  updateCar(id: string, car: any) {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return updateDoc(carDoc, car);
  }

  deleteCar(id: string) {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return deleteDoc(carDoc);
  }
  // Retrieve all test drive bookings
  getAllTestDriveBookings(): Observable<TestDrive[]> {
    const bookingsCollection = collection(this.firestore, 'testDriveBookings');
    return collectionData(bookingsCollection, { idField: 'id' }) as Observable<
      TestDrive[]
    >;
  }

  getTestDriveStatus(id: string): Promise<string> {
    const testDriveDoc = doc(this.firestore, `testDriveBookings/${id}`);
    return getDoc(testDriveDoc)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data()['status'] as string;
        } else {
          return 'Unknown'; // Document does not exist
        }
      })
      .catch((error) => {
        console.error('Error fetching test drive status', error);
        return 'Unknown'; // Return 'Unknown' in case of an error
      });
  }
  // Test Drive Booking
  bookTestDrive(booking: TestDrive) {
    const bookingsCollection = collection(this.firestore, 'testDriveBookings');
    return addDoc(bookingsCollection, booking);
  }

  updateTestDriveStatus(id: string, status: string) {
    const testDriveDoc = doc(this.firestore, `testDriveBookings/${id}`);
    return updateDoc(testDriveDoc, { status });
  }

  // Reservation
  async makeReservation(reservation: Paiement) {
    const reservationsCollection = collection(this.firestore, 'reservations');
    const docRef = await addDoc(reservationsCollection, reservation);
    return docRef.id;
  }

  // New method to get all reservations
  getAllReservations(): Observable<Paiement[]> {
    const reservationsCollection = collection(this.firestore, 'reservations');
    return collectionData(reservationsCollection, {
      idField: 'id',
    }) as Observable<Paiement[]>;
  }
}

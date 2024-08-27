import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly userKey = 'authenticatedUser'; // Key for storing user in local storage

  constructor(private auth: Auth) {}

  // Sign in with email and password
  signInWithEmail(email: string, password: string): Observable<User | null> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          this.storeUser(user); // Store user info in local storage
          return user;
        }
      )
    );
  }

  // Sign in with Google
  signInWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.auth, provider).then((userCredential) => {
        const user = userCredential.user;
        this.storeUser(user); // Store user info in local storage
        return user;
      })
    );
  }

  // Sign out
  signOut(): Observable<void> {
    return from(
      signOut(this.auth).then(() => {
        this.clearStoredUser(); // Clear user info from local storage
      })
    );
  }

  // Get the current user
  getCurrentUser(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.storeUser(user); // Store user info if available
        } else {
          this.clearStoredUser(); // Clear user info if not available
        }
        observer.next(user);
        observer.complete();
      });
    });
  }

  // Check if the authenticated user is the allowed user (based on email)
  isAllowedUser(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user && user.email === 'elmehdijaouhar@gmail.com') {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  // Store user info in local storage
  private storeUser(user: User): void {
    localStorage.setItem(
      this.userKey,
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      })
    );
  }

  // Retrieve stored user info from local storage
  getStoredUser(): User | null {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
    return null;
  }

  // Clear user info from local storage
  private clearStoredUser(): void {
    localStorage.removeItem(this.userKey);
  }
}

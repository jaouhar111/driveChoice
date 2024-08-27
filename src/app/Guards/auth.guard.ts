import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.isAllowedUser().pipe(
    map((isAllowed) => {
      console.log('User allowed:', isAllowed);
      if (!isAllowed) {
        router.navigate(['/notfound']);
        return false;
      }

      return true;
    })
  );
};

import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();
  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserRole().toLowerCase();

  if (isLoggedIn && expectedRoles == undefined) {
    return true;
  } else if (isLoggedIn && expectedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

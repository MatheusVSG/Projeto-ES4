import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/cookiesServices';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService: CookiesService = inject(CookiesService);
  const router: Router = inject(Router)
  let token = cookieService.getCookie('token');

  if (token) {
    return true;
  }
  else {
    router.navigateByUrl('/login');
    return false;
  }
};

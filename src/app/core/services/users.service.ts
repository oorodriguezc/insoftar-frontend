import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {apiConfig} from '../constants/constants';
import {User} from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private user: User;
  private urlApiSuffixService = '/users';
  private urlCatchSuffixRedirect = this.urlApiSuffixService;
  private urlEndPoint = environment.apiUrl + apiConfig.API_VERSION_1 + this.urlApiSuffixService;
  private errorBackendComunicationText = apiConfig.ERROR_BACKEND_COMUNICATION;
  private errorBackendNotServiceFoundText = apiConfig.ERROR_BACKEND_NOT_SERVICE_FOUND_TEXT;

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsersPageable(request): Observable<any> {
    const params = request;

    return this.http.get(this.urlEndPoint + '/pages', {params}).pipe(
      catchError(e => {
        return throwError(this.validateCatch(e, this.urlCatchSuffixRedirect));
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post(this.urlEndPoint, user).pipe(
      map((response: any) => response.user as User),
      catchError(e => {

        return throwError(this.validateCatch(e, this.urlCatchSuffixRedirect));
      })
    );
  }

  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${id}`).pipe(
      map((response: any) => {
        return response.data as User;
      }),
      catchError(e => {

        return throwError(this.validateCatch(e, this.urlCatchSuffixRedirect));
      })
    );
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${user.id}`, user).pipe(
      catchError(e => {

        return throwError(this.validateCatch(e, this.urlCatchSuffixRedirect));
      })
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        return throwError(this.validateCatch(e, this.urlCatchSuffixRedirect));
      })
    );
  }

  validateCatch(e: any, navigate: string): string {
    if (e.status === undefined || e.status === 0) {
      Swal.fire(this.errorBackendComunicationText, this.errorBackendNotServiceFoundText, 'error');

      return e;
    }
    if (e.status === 400 && e.error.message) {

      return e;
    }
    if (e.status !== 401 && e.error.message) {
      this.router.navigate([navigate]);
      console.error(e.error.message);
    }
    if (e.error.message) {
      console.error(e.error.message);
    }

    return e;
  }

}

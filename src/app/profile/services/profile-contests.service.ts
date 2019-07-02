import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { ContestModel } from 'src/app/shared/model/contest/contest.model';
import { SnackBarService } from 'src/app/shared/service/snack-bar.service';
import { SnackBarType } from 'src/app/shared/model/snack-bar.type';

@Injectable({
    providedIn: 'root'
})
export class ProfileContestsService implements Resolve<any> {

    private baseUrl = environment.backUrl + '/api/v1/';
    public contests: BehaviorSubject<ContestModel[]>;

    constructor(private http: HttpClient, private snackService: SnackBarService) {
        this.contests = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            this.getUserContests().toPromise()
                .then(([pronostics, contests]) => {
                    this.contests.next(contests);
                    resolve();
                })
                .catch(error => {
                    this.snackService.show(SnackBarType.error, error);
                    reject(error);
                });
        });
    }

    public getUserContests(): Observable<any> {
        return this.http.get(`${this.baseUrl}user/contests`);
    }
}

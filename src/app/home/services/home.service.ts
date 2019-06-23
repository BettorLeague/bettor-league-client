import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatDrawer} from '@angular/material';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ContestModel} from '../../shared/model/contest/contest.model';
import {TeamModel} from '../../shared/model/football/team.model';

@Injectable()
export class HomeService implements Resolve<any> {
  public startDrawer: MatDrawer;
  public endDrawer: MatDrawer;

  public topContests: BehaviorSubject<ContestModel[]>;
  public topTeams: BehaviorSubject<TeamModel[]>;
  public contestTotal: number;
  public teamTotal: number;
  public drawerView: string;

  private baseUrl = environment.backUrl + '/api/v1/';

  constructor(private http: HttpClient,
              private router: Router) {
    this.topContests = new BehaviorSubject([]);
    this.topTeams = new BehaviorSubject([]);
    this.drawerView = null;
    this.contestTotal = 0;
    this.teamTotal = 0;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.topContests = new BehaviorSubject([]);
    this.topTeams = new BehaviorSubject([]);
    this.contestTotal = 0;
    this.teamTotal = 0;
    this.drawerView = null;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getContests('PUBLIC', 0, 4, null, null).toPromise(),
        this.getTeams(0, 5, null, null).toPromise()
      ])
        .then(([paginateContests, paginateTeams]) => {
          const contests = paginateContests.content;
          this.contestTotal = paginateContests.totalElements;
          for (const contest of contests as ContestModel[]) {
            this.getMatches(contest.competition.id, contest.competition.currentSeason.currentMatchday).toPromise()
              .then(matches => {
                contest.competition.matches = matches;
              });
          }
          this.topContests.next(contests);
          const teams = paginateTeams.content;
          this.teamTotal = paginateTeams.totalElements;
          this.topTeams.next(teams);
          resolve();
        })
        .catch((error) => {
          this.router.navigate(['error/server']);
          reject(error);
        });
    });
  }

  public getContests(type: string, pageNumber: number, pageSize: number, sort: string, sortDirection: string): Observable<any> {
    return this.http.get(this.baseUrl + 'contest'
      + (type ? '?type=' + type : '')
      + (pageNumber || pageNumber === 0 ? '&page=' + pageNumber : '')
      + (pageSize ? '&size=' + pageSize : '')
      + (sort ? '&sort=' + sort : '')
      + (sortDirection ? '&sortDirection=' + sortDirection : ''));
  }

  public getTeams(pageNumber: number, pageSize: number, sort: string, sortDirection: string): Observable<any> {
    return this.http.get(
      this.baseUrl + 'team'
      + (pageNumber || pageNumber === 0 ? '?page=' + pageNumber : '')
      + (pageSize ? '&size=' + pageSize : '')
      + (sort ? '&sort=' + sort : '')
      + (sortDirection ? '&sortDirection=' + sortDirection : ''));
  }

  public getMatches(competitionId: number, matchDay: number): Observable<any> {
    return this.http.get(this.baseUrl + 'competition/'
      + competitionId + '/matches'
      + (matchDay ? '?matchday=' + matchDay : ''));
  }
}


import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {HomeService} from '../../../home/services/home.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {takeUntil} from 'rxjs/operators';
import {ProfileService} from '../../services/profile.service';
import {UserModel} from '../../../authentication/models/user.model';
import {ContestModel} from '../../../shared/model/contest/contest.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  widgets = {
    chartType: 'line',
    datasets: {
      '2019': [
        {
          label: 'Pronostics',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fill: 'start'
        },
        {
          label: 'Good Pronostics',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fill: 'start'
        }
      ]
    },
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    colors: [
      {
        borderColor: '#3949ab',
        backgroundColor: '#3949ab',
        pointBackgroundColor: '#3949ab',
        pointHoverBackgroundColor: '#3949ab',
        pointBorderColor: '#ffffff',
        pointHoverBorderColor: '#ffffff'
      },
      {
        borderColor: 'rgba(30, 136, 229, 0.87)',
        backgroundColor: 'rgba(30, 136, 229, 0.87)',
        pointBackgroundColor: 'rgba(30, 136, 229, 0.87)',
        pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
        pointBorderColor: '#ffffff',
        pointHoverBorderColor: '#ffffff'
      }
    ],
    options: {
      spanGaps: false,
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false
      },
      layout: {
        padding: {
          left: 24,
          right: 32
        }
      },
      elements: {
        point: {
          radius: 4,
          borderWidth: 2,
          hoverRadius: 4,
          hoverBorderWidth: 2
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: 'rgba(0,0,0,0.54)'
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              tickMarkLength: 16
            }
          }
        ]
      },
      plugins: {
        filler: {
          propagate: false
        }
      }
    }
  };

  user: UserModel;
  data: any;
  contests: ContestModel[];
  private unsubscribeAll: Subject<any>;

  constructor(private profileService: ProfileService,
              private authService: AuthenticationService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.data = null;
    this.profileService.getStats();
    this.profileService.stats
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        if (res && res.stats['2019']) {
          this.widgets.datasets['2019'][0].data = res.stats['2019'].pronostics;
          this.widgets.datasets['2019'][1].data = res.stats['2019'].goodPronostics;
          this.contests =  res.stats['2019'].contests;
          this.data = res;

        }
      });
    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        this.user = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}

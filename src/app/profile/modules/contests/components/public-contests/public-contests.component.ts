import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContestModel} from '../../../../../shared/model/contest/contest.model';

@Component({
    selector: 'app-public-contests',
    templateUrl: './public-contests.component.html',
    styleUrls: ['../../column.component.scss']
})

export class PublicContestsComponent implements OnInit {

    @Input() contests: ContestModel[];
    @Output() unsubscribeFromContest: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    unsubscribeFromPublicContest(contestInfo: {id: number, type: string}) {
        this.unsubscribeFromContest.emit(contestInfo);
    }

}

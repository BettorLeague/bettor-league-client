import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContestModel} from '../../../../../shared/model/contest/contest.model';

@Component({
    selector: 'app-private-contests',
    templateUrl: './private-contests.component.html',
    styleUrls: ['../../column.component.scss']
})
export class PrivateContestsComponent implements OnInit {

    @Input() contests: ContestModel[];
    @Output() unsubscribeFromContest: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    unsubscribeFromPrivateContest(contestInfo: {id: number, type: string}) {
        this.unsubscribeFromContest.emit(contestInfo);
    }
}

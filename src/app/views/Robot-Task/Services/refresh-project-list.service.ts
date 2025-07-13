import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshProjectListService {
    private refreshSubject = new Subject<void>();
    refreshNeeded$ = this.refreshSubject.asObservable();

    requestRefresh() {
        this.refreshSubject.next();
    }
}

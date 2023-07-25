import {
  Component,
  OnDestroy
} from '@angular/core';
import { Observable, merge, fromEvent, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-network-detection',
  templateUrl: './network-detection.component.html',
  styleUrls: [ './network-detection.component.scss' ]
})
export class NetworkDetectionComponent implements OnDestroy {

  private online$: Observable<boolean>;
  private isConnectedSub: Subscription;
  online: boolean;
  
  constructor() {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );

    this.isConnectedSub = this.online$.subscribe(isConnected => {
     this.online = isConnected;
    });
  }

  ngOnDestroy() {
    this.isConnectedSub.unsubscribe();
  }
}

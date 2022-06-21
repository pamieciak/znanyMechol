import { ChangeDetectionStrategy, Component } from '@angular/core';

export type x = {
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // public loader = false;

  constructor() {
    // this.router.events
    //   .pipe(
    //     // filter(event => event instanceof ResolveStart),
    //     tap(res => {
    //       console.log(res);
    //       if (res instanceof ResolveStart) {
    //         this.dialog.open(LoaderDialogComponent);
    //       } else if (res instanceof ResolveEnd) {
    //         this.dialog.closeAll();
    //       }
    //     })
    //   )
    //   .subscribe();
  }
}

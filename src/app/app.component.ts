import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { LoaderDialogComponent } from '@shared/components/loader-dialog/loader-dialog.component';
import { tap } from 'rxjs';

export type x = {
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public loader = false;

  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events
      .pipe(
        // filter(event => event instanceof ResolveStart),
        tap(res => {
          console.log(res);
          if (res instanceof ResolveStart) {
            this.dialog.open(LoaderDialogComponent);
          } else if (res instanceof ResolveEnd) {
            this.dialog.closeAll();
          }
        })
      )
      .subscribe();
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loader-dialog',
  templateUrl: './loader-dialog.component.html',
  styleUrls: ['./loader-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

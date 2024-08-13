import { Component, inject, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Web5 } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials';
import { IdentityService } from '../identity.service';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [AsyncPipe, MatGridListModule, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, RouterModule],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  appService = inject(AppService);

  layout = inject(LayoutService);

  @ViewChild(MatGridList) gridList!: MatGridList;

  constructor(private identity: IdentityService) {
    this.layout.resetActions();
  }

  async ngOnInit() {
    // console.log('Connecting to Web5...');
    // const { web5, did: myDid } = await Web5.connect();
    // console.log(myDid);
    // console.log(web5);
    // this.identity.web5 = web5;
    // this.identity.did = myDid;
  }

  tiles: any[] = [];

  addNewTile() {
    const newTile = { cols: 1, rows: 1, text: 'New Tile' };

    this.tiles.push(newTile);

    // this.gridList._updateCols();
  }

  hideIntroduction() {
    this.appService.state().hidden.introduction = true;
    this.appService.saveState();
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(['(max-width: 959.98px)']).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Favorite friends', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Favorite friends', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    }),
  );
}

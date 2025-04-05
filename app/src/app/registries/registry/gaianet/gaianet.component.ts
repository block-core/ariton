// https://airtable.com/shrb2A5dyfF0XofUr

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../../../layout.service';

@Component({
    selector: 'app-gaianet',
    imports: [MatButtonModule],
    templateUrl: './gaianet.component.html',
    styleUrl: './gaianet.component.scss'
})
export class GaianetComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOff();
    this.layout.customOn();
  }

  ngOnDestroy() {
    this.layout.customOff();
  }
}

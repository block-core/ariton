import { Component } from '@angular/core';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
})
export class IdentityComponent {
  constructor(public identity: IdentityService) {

  }
}

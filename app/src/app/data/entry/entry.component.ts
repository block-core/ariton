import { Component, effect, inject } from '@angular/core';
import { RegistryService } from '../../registry.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [JsonPipe, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class DataEntryComponent {
  entry: any;
  appService = inject(AppService);

  registryService = inject(RegistryService);

  constructor(private route: ActivatedRoute) {
    effect(() => {
      if (this.registryService.loaded()) {
        this.route.params.subscribe((params) => {
          const source = params['source'];
          const id = params['id'];

          console.log(this.registryService);

          this.entry = this.registryService.bsn.accounts.find((account) => {
            return account.id === id;
          });

          console.log(this.entry);
        });
      }
    });
  }
}

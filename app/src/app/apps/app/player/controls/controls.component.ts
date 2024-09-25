import { Component, ElementRef, inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../../../layout.service';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../../player.service';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class PlayerControlsComponent {
  @Input() miniplayer: boolean = false;
  layout = inject(LayoutService);

  player = inject(PlayerService);

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['miniplayer']) {
  //     if (this.miniplayer) {
  //       this.renderer.addClass(this.el.nativeElement, 'miniplayer');
  //     } else {
  //       this.renderer.removeClass(this.el.nativeElement, 'miniplayer');
  //     }
  //   }

  //   console.log('CHANGES', changes);
  // }

  closeTray() {
    this.layout.tray.set(false);
  }
}

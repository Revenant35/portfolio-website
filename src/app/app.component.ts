import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PulseCardComponent} from "./pulse-card/pulse-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PulseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lagDuration = 400; // ms

  @ViewChild('blob') blob: ElementRef | undefined;

  constructor() { }

  @HostListener('document:pointerout', ['$event'])
  onPointerOut(_event: Event) {
    if (!this.blob) {
      throw new Error('No blob element found');
    }
    this.blob.nativeElement.style.opacity = '0';
  }

  @HostListener('document:pointerenter', ['$event'])
  onPointerEnter(_event: Event) {
    if (!this.blob) {
      throw new Error('No blob element found');
    }
    this.blob.nativeElement.style.opacity = '0.6';
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: MouseEvent) {
    if (!this.blob) {
      throw new Error('No blob element found');
    }

    let {clientX, clientY} = event;
    const blobElement = this.blob.nativeElement;

    blobElement.style.opacity = '0.6';

    blobElement.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, {duration: this.lagDuration, fill: 'forwards'});
  }
}

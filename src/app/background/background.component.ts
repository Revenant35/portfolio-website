import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements AfterViewInit {

  lagDuration = 400; // ms

  @ViewChild('blob') blob: ElementRef | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.checkBlobAvailability();
  }

  checkBlobAvailability() {
    if (!this.blob) {
      throw new Error('No blob element found');
    }
  }

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
    const {clientX, clientY} = event;
    const blobElement = this.blob.nativeElement;

    blobElement.style.opacity = '0.6';

    blobElement.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, {duration: this.lagDuration, fill: 'forwards'});
  }
}

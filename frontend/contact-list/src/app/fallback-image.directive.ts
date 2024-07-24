import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFallbackImage]',
  standalone: true
})
export class FallbackImageDirective {
  @Input() appImgFallback: string = 'assets/user-profile-icon-free-vector.jpg';

  constructor(private elemRef: ElementRef) { }

  @HostListener('error')
  loadFallbackImageOnError() {
    const elem: HTMLImageElement = <HTMLImageElement>this.elemRef.nativeElement;
    elem.src = this.appImgFallback;
  }
}

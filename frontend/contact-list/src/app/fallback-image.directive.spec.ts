import { ElementRef } from '@angular/core';
import { FallbackImageDirective } from './fallback-image.directive';

describe('FallbackImageDirective', () => {
  let elementRef: ElementRef;
  let directive: FallbackImageDirective;

  beforeEach(() => {
    const imgElement = document.createElement('img');
    elementRef = new ElementRef(imgElement);
    directive = new FallbackImageDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set fallback image on error', () => {
    const fallbackUrl = 'assets/user-profile-icon-free-vector.jpg';
    directive.appImgFallback = fallbackUrl;

    directive.loadFallbackImageOnError();

    expect((elementRef.nativeElement as HTMLImageElement).src).toContain(fallbackUrl);
  });
});

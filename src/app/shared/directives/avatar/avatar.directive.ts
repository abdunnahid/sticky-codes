import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[avatar]'
})
export class AvatarDirective implements OnChanges {

  @Input('avatar') text: string;

  constructor(
    private readonly elementRef: ElementRef
  ) { }

  private get el(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnChanges(change): void {
    this.createAvatar();
  }

  createAvatar(): void {
    if (!this.text) {
      return;
    }

    const tempTexts: string[] = this.text.trim().split(' ');
    let avatar = '';
    for (const text of tempTexts) {
      avatar = avatar + text[0].toUpperCase();
    }

    this.el.innerText = avatar.substring(0, 2);
  }
}

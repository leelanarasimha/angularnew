import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class AppDropdownDirective {
	show = false;
	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {}

	@HostListener('click')
	onClick() {
		this.show = !this.show;
		for (const element of this.elementRef.nativeElement.children) {
			if (this.show) {
				this.renderer.addClass(element, 'show');
			} else {
				this.renderer.removeClass(element, 'show');
			}
		}
	}
}

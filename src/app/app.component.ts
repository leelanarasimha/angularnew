import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'complete-angular';
	loadedFeature: string = 'recipe';

	onFeatureSelected(event: string) {
		console.log('TCL: AppComponent -> onFeatureSelected -> event', event);
		this.loadedFeature = event;
	}
}

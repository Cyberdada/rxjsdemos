import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';
import { Control, ControlGroup, FormBuilder,
FORM_DIRECTIVES, AsyncPipe} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {searchComponent} from './search';
import {observeComponent} from './observe';
import {ProjectsComponent} from './project/projects.component';
import {ProjectDetailComponent} from './project/project.detail.component'; 
import  {PubSubService} from './project/current.project.evenEmitter'; 

@Component({
	pipes: [ AsyncPipe],
	selector: 'my-app1',
	providers: [PubSubService],
	directives: [searchComponent, observeComponent, ProjectsComponent,ProjectDetailComponent],
	template: `
	  	    <div class="container-fluid">
      <my-observer></my-observer><hr>
	  <my-search></my-search><hr>
	  <my-projects [ngClass]="{xinvisible:isAddingNewProject}" (edit)="switchMode($event)"></my-projects>
	  <my-project-detail  [ngClass]="{xinvisible:!isAddingNewProject}" (edit)="switchMode($event)"></my-project-detail>
     </div>
	 `, 
	  styles: [`
    .xinvisible { display:none}
  `],
})


class AppComponent {
	isAddingNewProject:boolean;

	constructor() {
		this.isAddingNewProject = false;
	}
	
	switchMode(mode:boolean) {
		this.isAddingNewProject = mode;
	}

}
bootstrap(AppComponent, [HTTP_PROVIDERS]);
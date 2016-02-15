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
 
@Component({
	pipes: [ AsyncPipe],
	selector: 'my-app1',
	directives: [searchComponent, observeComponent],
	template: `
	  	    <div class="container-fluid">
      <my-observer></my-observer><hr>
	  <my-search></my-search>
     </div>
	 `
})


class AppComponent1 {
	

	constructor() {
	
			
	}


}
bootstrap(AppComponent1);
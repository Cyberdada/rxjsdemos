import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/Rx/'

import {Observable  } from 'rxjs'
import {HTTP_PROVIDERS} from 'angular2/http'; 
import {Component} from 'angular2/core';
import { Control, ControlGroup, 
	FORM_DIRECTIVES, JsonPipe, AsyncPipe} from 'angular2/common';
import {Http, Headers} from 'angular2/http';

@Component( {
	pipes: [JsonPipe, AsyncPipe],
	selector :'my-app1',
	  template: `
	    <div class="container-fluid">
        <div class="row">
        <div class="col-xs-4">
        <h2>incremental searh via reddit API</h2>
        </div>
        <div class="col-xs-4">
         <div class="input-group somemarging">
		 <form [ngFormModel]='searchForm'>
      <input type="text" class="form-control" placeholder="Search...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
      </span>
	  </form>
    </div>
    </div>
     </div>
     <div class="box" *ngFor="#r of results | async">
     <small> {{r.title }} </small>
     <img *ngIf="r.url" [src]="r.url" />
     </div>
     </div>
	 `
	  ,
	  styles :[`
	      .somemarging {margin-top:20px;}
		  .box {float:left;width:140px;height:140px;padding: 5px;}
`] , 
  directives: [FORM_DIRECTIVES],
})


class AppComponent1 {
	searchForm:ControlGroup;
	results:Observable<any[]>;
	
	
	constructor( private http:Http) {
	let searhField = new Control();
	this.searchForm = new ControlGroup ( {searhField});
	
	this.results = searhField.valueChanges
	.debounceTime(500)
	.switchMap((val:string) => {
		return this.searhRedditPics(val);
	});
	}
	
	searhRedditPics(search:string) {
		let baseUrl = "https://www.reddit.com/r/pics/search.json?restrict_sr=on&q=";
		return this.http.get(baseUrl + search)
		.map(res => res.json())
		.map(this.translateRedditResults);
	}
	
	translateRedditResults (items:any) {
		let x = items.data.children;
		return x.map(item => {
			if(item && item.data && item.data.thumbnail) {
				let thumb:string = item.data.thumbnail;
				if(thumb.startsWith("http")) {
					return {url:thumb};
						}
				}
				return {title:item.data.title};
		})
	}
	
	
}
bootstrap(AppComponent1);
import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Component, OnInit} from 'angular2/core';
import {PubSubService} from './project/current.project.evenEmitter';


@Component({
  selector: 'my-observer',
  template: `
              <div class="container-fluid">
        <div class="row">
        <div class="col-xs-12">
        <h4>Observing the interval</h4>
        <p [ngClass]="{xinvisible:!isAddingNewProject}" style="background-color:red"> Project {{project}} Created !!!!</p>
        </div>
        </div>
        <div class="row">
        <div class="col-xs-4">
        (dont forget to share....)
        </div>
        <div class="col-xs-4">
      <label>Observer 1: </label> {{observer1}}
      </div>
      <div class="col-xs-4">
      <label>Observer 2: </label>  {{observer2}}
   </div>
   </div>
<div class="row somemarging">
        <div class="col-xs-4">
    <div class="buttspan">
  <button type="button" class="btn btn-primary btn-block" (click)=gogoGadget()>Go go gadget</button>
    <button type="button" class="btn btn-primary btn-block" (click)=observe1()>Subscribe nr 1</button>
      <button type="button" class="btn btn-primary btn-block" (click)=observe2()>Subscribe nr 2</button>
      </div>
      </div>
              <div class="col-xs-4">
         <div class="buttspan">
  <button type="button" class="btn btn-primary btn-block" (click)=stopGadget()>stop gadget</button>
    <button type="button" class="btn btn-primary btn-block" (click)=unobserve1()>Unsubscribe nr 1</button>
      <button type="button" class="btn btn-primary btn-block" (click)=unobserve2()>Unsubscribe nr 2</button>
      </div>
      </div>

      <div class="col-xs-4">
      <p>Example stolen and mutilated from :</p>
      <a href="http://blog.jhades.org/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/">
      http://blog.jhades.org/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/</a>

      </div>
      </div>
      </div>
	 `,
  styles: [`.somemarging {margin-top:20px;}
            .buttspan {width:200px;}
             .xinvisible { display:none}`]
})


export class observeComponent implements OnInit {
  isShared: boolean;
  observer1: number;
  isAddingNewProject: boolean;
  observer2: number;
  sub1: any;
  sub2: any;
  project: string;


  obs: Observable<number>;


  constructor(private pubsub: PubSubService) {
	   this.observer1 = NaN;
	   this.observer2 = -1;
    this.isAddingNewProject = false;
    this.project = "";
  }

  ngOnInit() {
this.pubsub.Stream.subscribe( itm => this.showProject(itm));
  }
  
  gogoGadget() {
    this.obs = Observable.interval(400)
    //	.take(4)
      .do(i  => console.log(i.toString(10) + " being emitted"))
    //	.share()
    ;

  }
  showProject(itm:string) {
    this.project = itm;
    this.isAddingNewProject = true;
      var obs = Observable.interval(1000)
    	.take(1)
      .do( i => {
        this.isAddingNewProject = false;
      }).subscribe();
  }

  stopGadget() {
    alert("yOU Cant stop the gadget....");
  }

  observe1() {
    this.sub1 = this.obs.subscribe(value => this.observer1 = value);

  }

  observe2() {
    this.sub2 = this.obs.subscribe(value => this.observer2 = value);
  }
  unobserve1() {
    this.sub1.unsubscribe();

  }

  unobserve2() {
    this.sub2.unsubscribe();
  }

}
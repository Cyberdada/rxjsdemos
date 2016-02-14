import {Subject } from 'rxjs/Subject';


export class CurrentProjectEventEmitter extends Subject<string>{
    constructor() {
        super();
    }
    emit(value) { super.next(value); }
}


export class PubSubService{
   Stream: CurrentProjectEventEmitter;
   constructor(){
       this.Stream = new CurrentProjectEventEmitter();
   }
}
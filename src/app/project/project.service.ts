import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Project, History, User } from  '../models/theModels';


@Injectable()
export class ProjectService {	
	
	constructor(private http:Http) {
	 console.log("project service is born");
	 this.get = http.get('api/projects').map(res =>res.json());
  }

    getById(id:string) {
      return this.http.get('api/projects/'+ id).map(res =>res.json());      
    }
  
	  post(project:any):any  {
      console.log("saving project");
     return this.http.post('api/projects', JSON.stringify(project), 
     		{headers: new Headers({'Content-Type':'application/json'})
     		}).map(res =>res.json());
     }
}

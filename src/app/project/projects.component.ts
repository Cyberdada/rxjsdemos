import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Project, IProject, History, User } from  '../models/theModels';
import {Inject} from 'angular2/core';
import {ProjectService} from './project.service';
import {PubSubService} from './current.project.evenEmitter';


@Component({
    selector: 'my-projects',
    templateUrl: 'app/project/projects.component.html', 
    providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {
     @Output() edit:EventEmitter<boolean> = new EventEmitter();
    allProjects: Project[];

    constructor(private ps:ProjectService, private pubsub:PubSubService) {
       this.allProjects = new Array<Project>();
    }

    ngOnInit() {
        this.getProjects();
        this.pubsub.Stream.subscribe( itm => this.getProjects());
    }
    
    getProjects() {
        this.ps.get.subscribe(res => this.allProjects = res);        
    }
    
    newProject() {
        this.edit.emit(true);
    }
    
}


import {Component, OnInit} from 'angular2/core';
import {Project, IProject, History, User } from  '../models/theModels';
import {Inject} from 'angular2/core';
import {ProjectService} from './project.service';


@Component({
    selector: 'my-projects',
    templateUrl: 'app/project/projects.component.html', 
    providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {
    allProjects: Project[];

    constructor(private ps:ProjectService) {
       this.allProjects = new Array<Project>();
    }

    ngOnInit() {
             this.ps.get.subscribe(res => {
            this.allProjects = res;
                console.log("Res: " + res);
        });
    }
    
}


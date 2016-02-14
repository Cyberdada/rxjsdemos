import {Component, OnInit, Input} from 'angular2/core';
import {Project, IProject, History, User, ProjectUser,stringIx, IProjectPermission } from  '../models/theModels';
import {Inject} from 'angular2/core';
import {StatusComponent} from '../status.component';


@Component({
    selector: 'my-user-projects',
    templateUrl: 'app/project/project.user.component.html',
    directives: [StatusComponent]
})

export class ProjectUserComponent {
    @Input() allProjects: IProjectPermission[];
    @Input() userId: string;


    constructor() { }
    
    printproj() {
        console.log("pringt proj");
        console.log(this.allProjects);
    }

    changeStatus(stringIx:stringIx) {
        this.allProjects[stringIx.index].permission = stringIx.val;    
    }
    


}

   


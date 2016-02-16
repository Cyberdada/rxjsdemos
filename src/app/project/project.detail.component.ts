import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {Project, User, Level, History } from   '../models/theModels';
import {ProjectService} from './project.service';
import {HistoryFactory} from '../history.factory';
import {PubSubService} from './current.project.evenEmitter';

@Component({
    selector: 'my-project-detail',
    templateUrl: 'app/project/project.detail.component.html',
    providers: [ProjectService, HistoryFactory]
})
export class ProjectDetailComponent implements OnInit {
    @Output() edit: EventEmitter<boolean> = new EventEmitter();

    constructor(private pubSubService: PubSubService,
        private pds: ProjectService,
        private hf: HistoryFactory) { }

    currentProject: Project;
    title: string;
    newLevelName: string;

    ngOnInit() {
        this.title = "A new Project";
        this.currentProject = new Project();
        this.currentProject.status = "new";
        this.currentProject.levels = [{ name: "Root Level" }];

    }

    saveProject() {
        if (!this.hasHistory()) {
            this.currentProject.history = this.hf.createHistory();
        }
        this.pds.post(this.currentProject).subscribe(res => {
            this.edit.emit(false);
            console.log(res);
            this.pubSubService.Stream.emit(this.currentProject.name);
        });

    }
    cancelSave() {
        this.edit.emit(false);
    }

    hasHistory() {
        return this.currentProject.history != undefined;
    }

    changeStatus(status: string) {
        this.currentProject.status = status;
    }

    addLevel() {
        this.currentProject.levels.push({ name: "" });
    }

    removeLevel(level: Level) {
        this.currentProject.levels.splice(this.currentProject.levels.indexOf(level), 1);
    }


}


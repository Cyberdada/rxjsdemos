import 'rxjs/add/operator/map';


import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';



@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
        <div class="row">
        <div class="col-xs-4">
        <h2>{{title}}</h2>
        </div>
        <div class="col-xs-4">
         <div class="input-group somemarging">
      <input type="text" class="form-control" placeholder="Search...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
      </span>
    </div>
    </div>
     </div>
    <div class="row">
        <div class="col-xs-4"><form role="form" class="form-inline"> <label>Project:</label>
            <select class="form-control" [ngModel]="user?.currentProject" (change)="userprojectChanged($event.target.value)">
            <option *ngFor="#project of user.authedProjects" value="{{project?.projectId}}">{{project?.projectName}}</option>
        </select> <a [routerLink]="['ProjectDetail']"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>
        </form>
        </div>
        <div class="col-xs-2">
        <div class="btn-group">
  <button type="button" class="btn btn-default">Add...</button>
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a [routerLink]="['UserDetail']">User</a></li>
  </ul>
</div>
        </div>
       <div class="col-xs-2">
        </div>
        <div class="col-xs-2">
        </div>
        <div class="col-xs-2">{{user.extId}}</div>
    </div>
    <router-outlet class="majnpain"></router-outlet>
       </div>
  `,
  styles: [`
    .majnpain {padding:15px;}
    .somemarging {margin-top:20px;}
    .xinvisible { display:none};
    a {padding: 5px;text-decoration: none;}
    a:visited, a:link {color: #444;}
    a:hover {color: white; background-color: #1171a3;}
    a.router-link-active {color: white; background-color: #52b9e9;}
    label {white-space:nowrap;}
  `],
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
@RouteConfig([
  {path: '/', redirectTo: ['Dashboard'] },
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent },
  { path: '/users', name: 'Users', component: UsersComponent },
  { path: '/users/detail', name: 'UserDetail', component: UserDetailComponent },
  { path: '/projects', name: 'Project', component: ProjectsComponent },
  { path: '/projects/detail', name: 'ProjectDetail', component: ProjectDetailComponent },
])
export class AppComponent implements OnInit {
  public title = 'rxjsdemo';
  appClass: string;
  loginClass: string;


  constructor(private pubSubService: PubSubService) { }

  ngOnInit() {
  }
  

  userprojectChanged(projectId: string) {
    this.pubSubService.Stream.emit(projectId);
  }

}


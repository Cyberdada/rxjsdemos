export interface IBase {
    name: string;
    description: string;
    status: string;
    history: IHistory;
}


export interface IHistory {
    description: string;
    modifiedBy: IUser;
    modificationDate: Date;
}

export interface IUser {
    extId: string;
    name: string;
    history: IHistory;
    projects: ProjectPermission[];
}

export class User implements IUser {
    public extId: string;
    public name: string;
    public history: History;
    public projects: ProjectPermission[];
}


export class History implements IHistory {
    public description: string;
    public modifiedBy: IUser;
    public modificationDate: Date;
}



export interface ILevel {
    name: string;
};

export class Level implements ILevel {
    public name: string;
};


export interface IProject extends IBase {
    levels: ILevel[];
};

export class Project implements IProject {
    public name: string;
    public description: string;
    public history: History;
    public status: string;
    public levels: Level[];
    public rootNodeName: string;

};


export class ProjectUser {
    userId: string;
    projectId: string;
    projectName: string;
    permission: string
}

export interface IProjectPermission {
    projectName: string;
    projectId: string;
    permission: Permission;
}

export class ProjectPermission implements IProjectPermission {
    public projectName: string;
    public projectId: string;
    public permission: Permission;
}

export class Permission {
    public level: number;
    public name: string;
}


export class stringIx {
    public val: Permission;
    public index: number;
}
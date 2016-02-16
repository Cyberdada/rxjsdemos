import  * as express from "express";
import mongoose = require("mongoose");
import {IProject, Project} from '../../src/app/models/theModels';


 interface IProjectModel extends IProject, mongoose.Document { }
 
 var levelShcema = new mongoose.Schema(
     {
         name :String}, 
         {_id:false})
 
 var projectSchema = new mongoose.Schema( 
     {
       
        name: String,
        nr: Number,
        description: String,
        history:  {
            description:String, 
            modificationDate:Date,
            modifiedBy : { 
                name:String, 
                extid:String },
            },
        status: String,
        roodNodeName:String, 
        levels:  [levelShcema]   
         
     }
 ) 

export function  save(req: express.Request, res: express.Response) {
var project = mongoose.model<IProjectModel>("Project", projectSchema);

project.create(req.body, function(err, project) {
    if (err) {
        return res.json({status: 500, error: err});
    }  
      
        res.json(project);
});
}

export function load (req: express.Request, res: express.Response ) {
    console.log("I been loading pojects....");
   var project = mongoose.model<IProjectModel>("Project", projectSchema);
   var q = project.find({}).sort("-_id");

    q.exec(function (err, db_articles) {
        if(err) { 
             return res.json({status: 500, error: err});
        }
    res.json(db_articles);
    });
}

export function loadById ( req: express.Request, res: express.Response ) {
    var project = mongoose.model<IProjectModel>("Project", projectSchema);
    project.findById(req.params.projectId, function (err, db_article) {
    if (err) {
            return res.json({status: 500, error: err});
    };
    console.log("nööh" + JSON.stringify(db_article));
    res.json(db_article);   
});
}




const express = require("express");
const { Pool } = require("pg");
const cors = require('cors');
var os = require('os');
const  logservice  = require('./LogService');
const {  ILog  } = require("./ILog");
 
const bodyParser = require('body-parser');
const app = express();
//const hostname = 'localhost';
const port = 8000;

 //CORS middleware
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost'); 
   // res.header('Access-Control-Allow-Origin', 'localhost');//replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);
 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const pool =   new Pool({ 
    database:"DBLog",
    host:"postgresdb",
    port:5432,
    user: "postgres",
    password: "1234"
})

logservice.Connection(pool)

app.get("/",(req,res)=>{
 res.send("welcome my app PostgreSQL ...");
});

app.get("/Create",(req,res)=>{
    logservice.CreateTable();
    res.send("Create  PostgreSQL");
});


app.get("/Delete",async(req,res)=>{
       let LogID = req.query.LogID;
       await logservice.Delete(LogID).then((state) =>{
        if(state){
              res.send( "Delete OK => LogID : " + LogID )
            }else {
              res.send( "Error Delete => LogID : " + LogID)
           }
        }).catch((e)=>{ res.send( "Error : " + e )});
 });

 app.get("/GetByID", async (req,res)=>{
    let LogID = req.query.LogID;
   await  logservice.GetByID(LogID).then((Log) =>{
        if(Log != null){
            res.send(  Log.log_datetime )
        }else {
            res.send( " Not Found Log " )
        }
    }).catch((e)=>{  res.send( "Error : " + e )});
 
});

app.get("/GetAll", async (req,res)=>{

    await  logservice.GetAll().then((Logs) =>{
        if(Logs != null){
            var Data="";
            Logs.forEach(Log => {
               Data += `LogUSerID:${Log.log_userid} , LogAction:${Log.log_action}  ` + os.EOL;
            });
            res.send( Data)
        }else {
            res.send( "Error Not Found Log "  )
        }
    }).catch((e)=>{  res.send( "Error : " + e )});
  
});

app.post("/Insert",async(req,res)=>{

    let userID = req.body.userID;

    const date  = new Date();  
    const Log = new ILog();
    Log.log_userid=userID;
    Log.log_action="Insert";
    Log.log_controller="Log";
    Log.log_datetime= date.toString();
     Log.log_message="mamad insert again again again again a row of log.";

   await logservice.Insert(Log).then((state) =>{
        if(state){
            res.send( "Insert OK Log: " + Log )
        }else {
            res.send( "Error Insert Log " )
        }
    }).catch((e)=>{  res.send( "Error : " + e )});

});


app.get("/Update", async(req,res)=>{
    let LogID = req.query.LogID;
    const date  = new Date();  
    const Log = new ILog();
    Log.log_id=LogID;
    Log.log_userid=10;Log.log_action="update";Log.log_controller="Log";Log.log_datetime= date.toString(); Log.log_message="mamad update  again a row of log.";

   await logservice.Update(Log).then((state) =>{
        if(state){
            res.send( "Update OK  Log:" + Log )
        }else {
            res.send( "Error Update Log " )
        }
    }).catch((e)=>{ res.send( "Error : " + e )});

});


app.listen(port, () => {
    console.log(`Server running at http://:${port}/`);
  });

  









 
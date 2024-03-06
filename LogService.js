      
     const {  Pool  } = require("pg")
     const {  ILog   } = require("./ILog")

     var   pool    = new Pool();
     var   Log     = new ILog();

     pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      })

    function Connection( _pool) {
        pool =_pool;
       // client.connect();
      //  CreateTable();
    }

    async function  CreateTable(){
        const createSql = 'CREATE TABLE IF NOT EXISTS Tbl_Log (Log_ID  SERIAL   PRIMARY KEY  NOT NULL  , Log_UserID  INT NOT NULL , Log_Action VARCHAR(100)   NULL, Log_Controller VARCHAR(100)   NULL , Log_DateTime VARCHAR(100) NOT NULL, Log_Message  TEXT   NULL  ); '
        const res = await pool.query(createSql);
        if (res.rowCount >0){
            return true;
        }
        return false;
    }

   async function Insert( _ILog )   {
            Log =_ILog; 
            const insertSql = 'INSERT INTO  Tbl_Log (Log_UserID,Log_Action,Log_Controller,Log_DateTime,Log_Message) VALUES ($1,$2,$3,$4,$5)'
            const res = await pool.query(insertSql, [Log.log_userid, Log.log_action, Log.log_controller,Log.log_datetime,Log.log_message])
            if (res.rowCount > 0){
                return true;
            }
            return false;
    }

    async function Update( _ILog ) {
        Log =_ILog; 
        const updateSql = 'UPDATE  Tbl_Log SET    Log_UserID=$1,Log_Action=$2,Log_Controller=$3,Log_DateTime=$4,Log_Message=$5 WHERE Log_ID=$6'
        const res = await pool.query(updateSql, [Log.log_userid, Log.log_action, Log.log_controller,Log.log_datetime,Log.log_message,Log.log_id])
        if (res.rowCount >0){
            return true;
        }
        return false;
    }

   async function Delete( LogID ) {

        const  deleteSql = 'DELETE FROM  Tbl_Log   WHERE  Log_ID=$1'
        const res = await pool.query(deleteSql, [LogID]);
        if (res.rowCount >0){
            return true;
        }
        return false;
  
    }
 
    async function  GetByID ( LogID  )  {

        const  selectSql = 'SELECT * FROM  Tbl_Log   WHERE  Log_ID=$1'
        const res = await pool.query(selectSql,  [LogID]);
        if (res.rows.length >0){
            Log = res.rows[0];
            return Log;
        }
        return null;
    }

    async function GetAll() {
        const  selectSql = 'SELECT * FROM  Tbl_Log '
        const res = await pool.query(selectSql);
        if (res.rows.length >0){
            Log = res.rows;
            return Log;
        }
        return null;
    }

    module.exports ={
        Connection ,
        CreateTable,
        GetAll,
        GetByID,
        Delete,
        Update,
        Insert
    }

 
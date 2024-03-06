

 
  function ILog(Log_ID,LogUserID, LogAction, LogController,LogDateTime,LogMessage) {
    this.log_id = Log_ID;
    this.log_userid = LogUserID;
    this.log_action = LogAction;
    this.log_controller = LogController;
    this.log_datetime = LogDateTime;
    this.log_message = LogMessage;
   
  }

  module.exports ={
    ILog
  }
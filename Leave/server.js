var
http = require ('http'),
express = require('express'),
app = express(),
url = require('url'),
bodyParser = require('body-parser'),
dMember = null,
dSchema = null,
lSchema = null,
lMember = null,
mongoose = require ("mongoose"),
dbConnString = 'mongodb://localhost/sampledata',
initApp = function(){
 
  http.createServer(app).listen(app.get('port'),function(){
 
    console.log('Your Application is running on:' + app.get('port'));
  });
};
 

mongoose.connect(dbConnString,function(err, res){
  if (err){
    console.log ('ERROR connecting to: ' + dbConnString + '! ' + err);
  } else {
    console.log ('Successfully connected to MongoDb');
  }
});
 


dSchema = new mongoose.Schema({

    fromDate: Date,
    toDate: Date,
    noOfLeaveDays:Number,
    ReasonforApply: String,
    mailId: String,
    applyLeavestatus: String
    
    
});
lSchema = new mongoose.Schema({
	slNo: Number,
	data: Date,
	day: String,
	festival: String
});

/*cacellation scema*/
cSchema = new mongoose.Schema({
    reasonforcancelLeave:String,
     approverMailId: String,
    cancelLeaveStatus:String
});

dMember = mongoose.model('empdata', dSchema);
lMember = mongoose.model('holidayCalendar', lSchema);
cMember = mongoose.model('cancelLeaveData',cSchema);

app.set('port', 8080);
app.use(express.static(__dirname, '/'));
app.use(bodyParser());
  
app.post('/', function(req, res) {
	
	var obj = req.body;
    
   //console.log(obj.fromDate);
    
	var fromDate = req.body.fromDate;
	var toDate = req.body.toDate;
    var noOfLeaves = req.body.noOfLeaveDays;
	var reasonForLeave = req.body.reasonForLeaveRequest;
	var approvarMailId = req.body.approverEmailId;
    var applyLeavestatus = req.body.status;
	//var reasonforcancelLeave = req.body.reasonforcancelLeaveRequest;
    
	console.log(fromDate+"  "+toDate+"  "+reasonForLeave+"   "+approvarMailId+"  "+noOfLeaves+" "+applyLeavestatus);
	
	var newData = new dMember ({
		fromDate: fromDate,
		toDate: toDate,
        noOfLeaveDays:noOfLeaves,
		ReasonforApply: reasonForLeave,
		mailId: approvarMailId,
        applyLeavestatus: applyLeavestatus
       // reasonforcancelLeave:cancelForLeave
	});

	newData.save(function(err) {
	if(err){
	console.log("error on save");	
	}
		
	});
    
    /* Cancel Leave form*/
    
	
});
app.get('/xyz', function(req, res) {
   
	/*var newData = new lMember ({
		
		slNo: 10,
		data: 10-5-2014,
		day: "ksjdfkas",
		festival: "ksdjfksd"
	});
	
	newData.save(function(err) {
		
	});
	*/
	
	
  lMember.find(function(err, remain) {
				if (err)
				{
				res.send(err)
				}//res.json(remain);
				
				res.json(remain);
				
			});
   
});

/* insertingf cancel leave feilds in mongodb */
app.post('/cancel',function(req,res){
    
    //var obj = req.body;
   var reasonforcancelLeave = req.body.reasonforcancelLeaveRequest; 
    var approverMailId = req.body.approverMailId;
    var cancelLeaveStatus = req.body.cancelLeaveStatus;
    
    console.log(reasonforcancelLeave);
    
    var insertCancelData = new cMember({
        reasonforcancelLeave:reasonforcancelLeave,
        approverMailId:approverMailId,
        cancelLeaveStatus:cancelLeaveStatus
        
    });
    insertCancelData.save(function(err){
        if(err) {
            console.log("Error in save");
        }
    });
});

/* get data for cancel Leave form */
app.get('/cancel', function(req, res) {
    
    
    dMember.find(function(err,remain){
        if(err){
            res.send(err)
            }
        
         //console.log(remain);
                res.json(remain);
    });

});



/* Cancel Leave by Id */
app.put('/cancelById/:id',function(req,res){

   
       return dMember.findById(req.params.id, function(err, cmember) {
        //console.log(cmember);
           if(cmember.applyLeavestatus == "Pending"){
                cmember.applyLeavestatus = "Cancelled";       
           }else if(cmember.applyLeavestatus == "Approved"){
               cmember.applyLeavestatus = "Cancelled";
           }
        //cmember.applyLeavestatus = "Approved";
        //console.log("after modify:"+cmember);
        cmember.save(function(err) {
            
            if (!err) {
                //return "Cancelled";
                dMember.findById(req.params.id, function(err, cm) {
                   // console.log("after updating :"+cm);
                    return res.send(cm);
                });
               
            }else{
                return false;
               // return console.log("Errors:====> "+err.errors);
                //return console.log(err);
            }
        });

    });
});


initApp();
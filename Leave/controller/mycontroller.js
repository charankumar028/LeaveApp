var  mycontroller = function($scope, myfactory) {

	//alert("this is controller");
     $scope.info = {status:'Pending'};

	$scope.applyForLeave =function(empdata) {
    
       
        //var y=document.getElementById("demo").value;
        //alert(y);
        
        var fromDate = empdata.fromDate;
       // alert(fromDate);
        var toDate = empdata.toDate;
        
        var oneDay = 1000*60*60*24;
        
        var date1 = new Date(fromDate).getTime();
       // alert(date1);
        var date2 = new Date(toDate).getTime();
        
        var substract = Math.abs(date1-date2);
        var result = Math.round(substract/oneDay);
       
        empdata.noOfLeaveDays = result;
        
       // alert(empdata.fromDate+"  "+empdata.toDate+"  "+empdata.reasonForLeaveRequest+"   "+empdata.approverEmailId+"  "+empdata.noOfLeaveDays);
        
		/*var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        var reasonForLeave = $('#reasonForLeave').val();
        var approverMailId = $('#approverMailId').val();
        
        var isValid = true;
        var reg = /^([A-Z a-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        
        /* fromDate validations 
        if(fromDate.length === 0){
        $("#fromDateError").html("<font color='red'>Please enter fromDate</font>");
            isValid = false;
            $("#fromDate").focus();
        }else{
            //AllowChars();
            $("#fromDateError").html("");
        }
        
        /* toDate validations
        if(toDate.length === 0){
        $("#toDateError").html("<font color='red'>Please enter toDate</font>");
            isValid = false;
            $("#toDate").focus();
        }else{
            //AllowChars();
            $("#toDateError").html("");
        }
        
        /* Reason for Apply validations 
        if(reasonForLeave.length === 0){
        $("#reasonForLeaveError").html("<font color='red'>Please enter the reason for Leave</font>");
            isValid = false;
            $("#reasonForLeave").focus();
        }else{
            //AllowChars();
            $("#reasonForLeaveError").html("");
        }
        
        /* Email Validations 
        
        if(approverMailId.length === 0){
            $("#approverMailIdError").html("<font color='red'>Please enter email address</font>");
            isValid = false;
            $("#approverMailId").focus();
        } else if(reg.test(approverMailId) == false) {
            $("#approverMailIdError").html("<font color='red'>Invalid email address</font>");
            isValid = false;
            $("#approverMailId").focus();
        } else{
            $("#approverMailIdError").html("");
        }
        */
        
        //return;
        
        //alert(empdata);
        

      
		myfactory.putval(empdata);	
	
	}	
    $scope.listOfHRLeaves = function() {
        
     myfactory.getdata()
     .success(function(mdata) {
       
        $(".row").show();
        $scope.preview = mdata;
         
     })
     .error(function(data, status, header, config) {
         
         
         
     });
        
    }
    
    $scope.hlClocse = function() {  
        $("#closeDetails").hide();
         //alert(123);
    };
    
    
};
mycontroller.$inject = ['$scope', 'myfactory'];
angular.module("myapp").controller("mycontroller", mycontroller);


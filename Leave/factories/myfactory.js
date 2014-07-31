
var myfactory = function ($http) {

    
    //alert("this is factory");
	var factory = {};
	factory.putval = function(tv) {
		
		
		
		//$http.post('/'+tv.fromDate+'/'+tv.toDate+'/'+tv.reasonForLeaveRequest+'/'+tv.approverEmailId);
        $http.post('/',tv);
		
		alert("Applied Successfully");
        $('#fromDate').val("");
        $('#toDate').val("");
        $('#reasonForLeave').val("");
        $('#approverMailId').val("");
        $('#submitForLeave').attr("disabled", "disabled");
		
	}
    
    factory.putCancelVal = function(lv){
        $http.post('/cancel',lv);
        alert('Cancel Request Sent');
        $(".table-bordered").find("input:radio:checked").removeProp('checked'); 
         $('#reasonForCancelLeave').val("");
        $('#approverMailId').val("");
         $('#cancelForLeave').attr("disabled", "disabled");
    }
    
	factory.getdata  = function() {
        return $http.get('/xyz');        
    }
    
    factory.cancelData = function() {
        return $http.get('/cancel');
    }
    
    factory.cancelDataById = function(id) {
        var result = $http.put('/cancelById/' + id);
        //console.log("result in factory :"+result);
        return result;
    }


	return factory;
};
angular.module('myapp').factory('myfactory', myfactory);

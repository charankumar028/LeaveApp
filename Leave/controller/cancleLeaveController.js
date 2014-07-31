var  cancelLeaveRecords = function($scope, myfactory) {

        myfactory.cancelData()
        .success(function(cdata){
                console.log(cdata);
            $scope.cancelData = cdata;    
        })
        .error(function(data,status,header,config){
        
        });
    
        
    $scope.cancelForLeave = function(cdata) {
        
        var sId = $(".table-bordered input:radio:checked").attr("id"); 
        //alert(sId);
         myfactory.cancelDataById(sId)
        .success(function(data){
            //alert(data);
            console.log("data in controller:"+data.applyLeavestatus);
            $(".leave_"+sId).html(data.applyLeavestatus);
        })
         .error(function(data,status,header,config){
                console.log('Error: ' + data);
        });
       /* var id = $("#").val('cdataId.id');
        alert(id);
        myfactory.cancelDataById()
        .success(function(cdataId){
            alert(cdataId);
           var id = $("#leaveType").val('cdataId.id');
            alert(id);
            console.log("id:"+id);
        })
        .error(function(cdata,status,header,config){
                console.log('Error: ' + cdataId);
        });*/
        myfactory.putCancelVal(cdata);
    };
        
};

cancelLeaveRecords.$inject = ['$scope','myfactory'];
angular.module("myapp").controller("cancelLeaveRecords",cancelLeaveRecords)


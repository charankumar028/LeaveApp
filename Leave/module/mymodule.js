//alert("this is module");


var mymod = angular.module('myapp', ['ngRoute']);
mymod.config(function ($routeProvider) {
$routeProvider
    .when('/',
    {
        controller: 'mycontroller',
        templateUrl:'../views/applyLeave.html'
    })
    .when('/cancelLeave',
    {
        controller:'cancelLeaveRecords',
        templateUrl:'../views/cancelLeave.html'
    })
    .otherwise({redirectTo:'/'});
});

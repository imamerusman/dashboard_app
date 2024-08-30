(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dataService', '$rootScope', '$http','$scope','$interval', '$location'];
    function DashboardController(dataService, $rootScope, $http, $scope, $interval, $location) {
        var vm = this;
        console.log();  
        
        //Show Current Username in navbar
        document.getElementById("user-pic-text").innerHTML = 'Welcome ' + localStorage.getItem("currentUser");
        $rootScope.location = $location.path();
        
        //Calling DataService to fetch equipments
        this.loadData = function (){
            $scope.equipments = dataService.data.response.equipments;
             $scope.overallData = dataService.data.response.overallData;
        }
        
        
       //Implemented Long Polling
       $interval(function(){
            this.loadData();
        }.bind(this), 10000);    

        //invoke initialy
         this.loadData();
            $scope.chartTitle = "Lead Sources";
        $scope.chartWidth = 500;
        $scope.chartHeight = 300;
        $scope.chartData = [
        ['All systems clear', $scope.overallData[0] ],
        ['Building close-down scheduled for Sun, 3am', $scope.overallData[1] ]
        ];
        
        
    
        
        
                //Add Comments Functionality
                $scope.commentBox = false;
                $scope.txt;
                $scope.showCommentBox = function(){
                    $scope.commentBox = true;                            
                }
                $scope.comment = [];
                $scope.btn_add = function(value) {
                    
                    if(value !=''){
                    $scope.comment.push(value);
                    $scope.txt = "";
                    }
                }
 
                $scope.remItem = function($index) {
                    $scope.comment.splice($index, 1);
                }
    }

})();


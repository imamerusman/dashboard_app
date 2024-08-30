(function () {
    'use strict';

    angular
        .module('app')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$rootScope', '$http','$scope','$interval', '$location'];
    function DetailController($rootScope, $http, $scope, $interval, $location) {
        var vm = this;  
        
        document.getElementById("user-pic-text").innerHTML = 'Welcome ' + localStorage.getItem("currentUser");
     
         $http.get('../app_content/data/data_equipment_detail.json').success(function(data) {
          $scope.equipments = data.equipments;
        });

        $scope.logsData = [
            {
                hour: 1,
                err: 54
            },
            {
                hour: 2,
                err: 66
            },
            {
                hour: 3,
                err: 77
            },
            {
                hour: 4,
                err: 70
            },
            {
                hour: 5,
                err: 60
            },
            {
                hour: 6,
                err: 63
            },
            {
                hour: 7,
                err: 55
            },
            {
                hour: 8,
                err: 47
            },
            {
                hour: 9,
                err: 55
            },
            {
                hour: 10,
                err: 30
            }
        ];
        
        $interval(function () {
            var hour = $scope.logsData.length + 1;
            var err = Math.round(Math.random() * 100);
            $scope.logsData.push({
                hour: hour,
                err: err
            });
        }, 1000, 10);
    }

})();


(function () {
    'use strict';

 var dataService = angular.module("app").factory("dataService", ['$http', '$timeout', function($http, $timeout) {
    
    var data = { response: {}, calls: 0 };
    
    //Implemented Equipments Service with Long Polling Concept
    var poller = function() {
        $http.get('../app_content/data/data_equipment.json').then(function(r) {
        data.response = r.data;
        data.calls++;
        
        //Service is hitted after every 1 min
        $timeout(poller, 10000);
        });
    };
    poller();
  
  return {
    data: data
  };
}]);

})();

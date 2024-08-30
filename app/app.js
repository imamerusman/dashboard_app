
//Require Angular Resources
var angular = require('angular');
require('angular-cookies');
require('angular-route');
require('angular-resource');

var app = angular.module('app', ['ngCookies','ngRoute','ngResource'])
.config(config)

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm' 
            })
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .when('/detail', {
                templateUrl: 'detail/detail.view.html',
                controller: 'DetailController',
                controllerAs: 'vm'
            })
            
            .otherwise({ redirectTo: '/' });
            
            $locationProvider.html5Mode(true).hashPrefix('!');
    }

//Initialized Google Charts Api
google.load('visualization', '1', {
    packages: ['corechart']
});


   
// Initialize the application
app.run(function(dataService) {});


//Require Application Services
require('./app_services/authentication.service');
require('./app_services/equipment.service');
require('./app_services/flash.service');
require('./app_services/user.service');
require('./app_services/user.service.local-storage');

//Require Application Controllers
require('./login/login.controller');
require('./register/register.controller');
require('./dashboard/dashboard.controller');
require('./detail/detail.controller');

//Require Application Directives
require('./app_directives/directives');

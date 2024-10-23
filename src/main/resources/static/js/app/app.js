const app = angular.module('app', ['ui.router']);
app.factory('dialogService', function() {
    return {
        showErrorDialog: function(title, message) {
            Swal.fire({
                icon: "error",
                title: title,
                text: message,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        },
        showSuccessDialog: function (title, message){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: title,
                text: message,
                showConfirmButton: false,
                timer: 1500
            });
        },
    };
});

app.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl: 'partials/home',
            controller: 'HomeController',
            controllerAs:'ctrl'
        })
        .state('login',{
            url: '/login',
            templateUrl: 'partials/login',
            controller: 'loginController',
            controllerAs:'ctrl'
        })
        .state('crawl',{
            url:'/crawl',
            templateUrl:'partials/crawl',
            controller: 'CrawlController',
            controllerAs:'ctrl'
        })
        .state('crawl-data',{
            url:'/crawl-data',
            templateUrl:'partials/crawl-data',
            controller:'CrawlDataController',
            controllerAs:'ctrl'
        })
        .state('log-data',{
            url:'/log-data',
            templateUrl:'partials/log-data',
            controller:'LogDataController',
            controllerAs:'ctrl'
        })
        .state('log2',{
            url:'/log2/:logId',
            templateUrl:'partials/log2',
            controller:'Log2Controller',
            controllerAs:'ctrl'
        })
});
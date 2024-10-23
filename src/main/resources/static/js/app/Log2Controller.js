'use strict'
angular.module('app')
    .factory('Log2Service', ['$http', '$q',function ($http,$q){
        const factory={
            getLog : getLog
        };

        function getLog(logId){
            const deferred = $q.defer();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
            $http.get('http://localhost:8080/app/log/'+logId,{headers:headers})
                .then(
                    function (res){
                        console.log('Get all Data');
                        console.log(res.data)
                        deferred.resolve(res.data)
                    },
                    function (err){
                        console.log("error: " + err.message())
                        deferred.reject(err);
                    }
                );
            return deferred.promise;
        }

        return factory;
    }])
    .controller('Log2Controller',['$state','$scope','$stateParams','Log2Service','dialogService', function ($state, $scope, $stateParams,Log2Service,dialogService){
    const self = this;
    let logId = $stateParams.logId;
    self.backToLog= function (){
        $state.go('log-data')
    }
    self.logData = {
        id:'',
        url:'',
        method:'',
        request:{},
        response:{},
        statusCode:0,
        startTime:'',
        endTIme:'',
        duration:0
    };
    console.log(logId);
    getLog(logId);
    function getLog(logId){
        console.log('log id: ' + logId);
        Log2Service.getLog(logId).then(
            function (response){
                self.logData = {};
                self.logData.id = response.id;
                self.logData.url = response.url;
                self.logData.method = response.method;
                self.logData.request = JSON.parse(response.request);
                self.logData.response = JSON.parse(response.response);
                self.logData.statusCode = response.status;
                self.logData.startTime = response.startTime;
                self.logData.endTIme = response.endTime;
                self.logData.duration = response.duration;
            }
            ,function (err){
                dialogService.showErrorDialog("Error", err.message);
            }
        )
    }


}])

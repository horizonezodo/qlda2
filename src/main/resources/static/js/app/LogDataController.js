
angular.module('app').factory('LogDataService', ['$http', '$q',function ($http,$q){
    const factory={
        getAllData:getAllData,
        searchData:searchData,
    };

    function getAllData(){
        const deferred = $q.defer();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
        $http.get('http://localhost:8080/app/all-log',{headers:headers})
            .then(
                function (res){
                    console.log('Get all Data');
                    deferred.resolve(res.data)
                },
                function (err){
                    console.log("error: " + err.message())
                    deferred.reject(err);
                }
            );
        return deferred.promise;
    }

    function searchData(keyvalue){
        const deferred = $q.defer();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
        $http.post('http://localhost:8080/app/search-log?key=' + keyvalue,{},{headers:headers})
            .then(
                function (res){
                    console.log("search success");
                    console.log(res.data);
                    deferred.resolve(res.data);
                },function (err){
                    console.log('Search Error: ', err.message);
                    deferred.reject(err);
                }
            );
        return deferred.promise;
    }
    return factory;
}])
    .controller('LogDataController',['LogDataService','dialogService','$scope','$state',function(LogDataService,dialogService,$scope,$state){
        const self = this;
        self.logDatas = [];
        self.key = '';
        self.submit = submit;
        self.viewDetail = function (id){
            console.log(id)
            $state.go('log2',{logId:id})
        };

        loadAllData();

        function loadAllData(){
            LogDataService.getAllData().then(
                function (response){
                    self.logDatas = [];
                    self.logDatas = response;}
                ,function (err){
                    dialogService.showErrorDialog("Error", err.message);
                }
            )
        }

        function submit(key){
            console.log('call submit')
            LogDataService.searchData(self.key).then(
                function (response){
                    console.log('data search: ', response);
                    self.logDatas = [];
                    self.logDatas = response;
                }, function (err){
                    console.log("err: ", err);
                    dialogService.showErrorDialog("Error", err.message);
                }
            )
        }

    }])
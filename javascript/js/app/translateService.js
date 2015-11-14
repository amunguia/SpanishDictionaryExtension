angular.module('translateApp').
    factory('translateService', ['$http', function($http) {
        $http.get("https://protected-falls-9997.herokuapp.com/translate/initialize");

        return {
            lookup: function(term) {
                return $http.get("https://protected-falls-9997.herokuapp.com/translate/"+term).then(function(data){
                    return angular.fromJson(data).data;
                }, function(response) {
                    return {error: "There was an error with the request."};
                });
            }
        };
    }]);
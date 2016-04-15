/**
 * Created by danle on 4/13/16.
 */
(function() {
    angular
        .module('webScraper')
        .service('HomeService', HomeService);

    function HomeService($http) {
        this.getData = function() {
            return $http({
                method: 'GET',
                url: '../data.json'
            }).then(function(response) {
                return response.data
            })
        }
    }
})();
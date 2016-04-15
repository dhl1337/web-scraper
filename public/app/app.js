/**
 * Created by danle on 4/13/16.
 */
(function() {
    angular
        .module('webScraper', ['ui.router'])
        .config(['$stateProvider','$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '../public/app/views/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            });
        $urlRouterProvider.otherwise('/home');
    }
})();
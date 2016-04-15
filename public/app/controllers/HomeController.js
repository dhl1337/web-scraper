/**
 * Created by danle on 4/13/16.
 */
(function() {
    angular
        .module('webScraper')
        .controller('HomeController', ['HomeService', HomeController]);

    function HomeController(HomeService) {
        var vm = this;

        HomeService.getData().then(function (data) {
            vm.data = data;
            console.log(data[0].title);
            console.log(vm.data);
        });
    }
})();
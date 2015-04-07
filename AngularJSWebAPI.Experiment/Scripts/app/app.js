angular.module("app", ['ngRoute', 'restangular', 'ui.bootstrap', 'app.user'])

.config(['$routeProvider', '$locationProvider', 'RestangularProvider',
    function ($routeProvider, $locationProvider, restangularProvider) {

        $routeProvider.when('/',
            {
                controller: 'HomeController',
                templateUrl: '/scripts/app/user/home.html'
            });

        //$routeProvider.when('/error',
        //    {
        //        controller: 'ErrorController',
        //        controllerAs: 'error',
        //        templateUrl: '/scripts/app/error/error.html'
        //    });

        //$routeProvider.when('/error/not-found',
        //    {
        //        controller: 'ErrorNotFoundController',
        //        controllerAs: 'error',
        //        templateUrl: '/scripts/app/error/not-found.html'
        //    });

        //$routeProvider.otherwise({ redirectTo: '/error/not-found' });

        $locationProvider.html5Mode(true);

        restangularProvider.setBaseUrl('/api');
    }]);


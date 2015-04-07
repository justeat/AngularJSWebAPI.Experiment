angular.module("app.user.factory", [])
 .factory('UserFactory', ['Restangular',
        function (restangular) {

            var service = {
                create: function () {

                    var user = {
                        id: null,
                        displayName: "",
                        mobileContact: "",
                        post: function () {
                            return restangular.all("users").post(this);
                        }
                    };

                    return user;
                }
            };

            return service;
        }])
.factory('GetUsersFactory', ['Restangular',
        function (restangular) {

            var service = {
                get: function () {

                    return restangular.all('users').getList().then(function (data) {
                        return data;
                    });
                }
            };

            return service;
        }]);


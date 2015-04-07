angular.module("app.user", ['app.user.factory'])
    .controller("HomeController", ['$scope', '$modal', '$location', 'GetUsersFactory', 'UserFactory',
         function ($scope, $modal, $location, getUsersFactory, userFactory) {

             $scope.users = [];

             $scope.data = {
                 showError: false
             };
             
             getUsersFactory.get().then(function (data) {
                 $scope.users = data;
             }, function (error) {
                 if (error.status == 404) {
                     return $location.path('/error/not-found-restaurant');
                 }
                 if (error.status != 401) {
                     return $location.path('/error');
                 }
             });
             

             $scope.deleteUser = function (user) {

                 user.remove().then(function () {
                         var index = $scope.users.indexOf(user);
                         $scope.users.splice(index, 1);
                     }, function (error) {
                         $scope.data.showError = true;
                     });
             };
             
             $scope.addUser = function () {
                 $scope.data.showError = false;

                 $modal.open({
                     templateUrl: '/scripts/app/user/addUserModal.html',
                     controller: "addUserModalController",
                     resolve: {
                         model: function () {
                             return userFactory.create();
                         },
                         users: function () {
                             return $scope.users;
                         }
                     }
                 });
             };
             
             $scope.editUser = function (user) {

                 $scope.data.showUsernameUniqueError = false;
                 $scope.data.showError = false;

                 var modalInstance = $modal.open({
                     templateUrl: '/scripts/app/user/editUserModal.html',
                     controller: "editUserModalController",
                     size: "small",
                     resolve: {
                         model: function () {
                             $scope.original = user;
                             return user;
                         },
                         users: function () {
                             return $scope.users;
                         }
                     }
                 });
                 
                 modalInstance.result.then(function (userItem) {

                     userItem.put().then(function (editedUser) {
                         angular.copy(editedUser, $scope.original);
                     }, function (error) {
                         $scope.data.showError = true;
                     });
                 });
             };
             
         }])
     .controller("addUserModalController", ['$scope', '$modalInstance', 'model', 'users', 'Restangular',
        function ($scope, $modalInstance, model, users, restangular) {
            $scope.addUserShadow = model;

            $scope.addUserShadow.isInProgress = false;
            $scope.data =
            {
                isSubmitted: false,
                showNameRequiredError: function () {
                    return $scope.addUserForm.displayName.$error.required && ($scope.addUserForm.displayName.$dirty || $scope.data.isSubmitted);
                }
            };

            $scope.add = function () {
                $scope.data.isSubmitted = true;
                $scope.addUserShadow.isInProgress = true;

                if ($scope.addUserForm.$invalid) {
                    $scope.addUserShadow.isInProgress = false;
                    return;
                }

                model.post().then(function (data) {
                    //this to add new user into restangular drivers list
                    users.push(restangular.restangularizeElement('', data, 'users'));
                    $scope.createUser = data;
                    $scope.isUserCreated = true;
                    $scope.addUserShadow.isInProgress = false;
                    $scope.data.showError = false;
                }, function (error) {
                    $scope.addUserShadow.isInProgress = false;
                    $scope.data.showError = true;
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }])
    .controller("editUserModalController", ['$scope', '$modalInstance', 'model', 'Restangular',
        function ($scope, $modalInstance, model, restangular) {
            $scope.shadow = restangular.copy(model);

            $scope.data =
            {
                isSubmitted: false,
                showNameRequiredError: function () {
                    return $scope.editUserForm.displayName.$error.required && ($scope.editUserForm.displayName.$dirty || $scope.data.isSubmitted);
                }
            };
            
            $scope.edit = function () {
                $scope.data.isSubmitted = true;
                if ($scope.editUserForm.$invalid) {
                    return;
                }

                $modalInstance.close($scope.shadow);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);

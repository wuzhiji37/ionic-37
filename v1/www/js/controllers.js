angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state) {
    $scope.search = function() {
        $state.go("tab.search");
    };
    $scope.buy = function() {
        $state.go("buy");
    };
})
.controller('BuyCtrl', function($scope) {

})
.controller('SearchCtrl', function($scope) {
    $scope.vin = { text: "" };
    $scope.hint = "0/17";
    $scope.vinChange = function() {
        var vin = $scope.vin.text;
        var subvin = vin.substring(0, Math.min(17, vin.length)).toUpperCase();
        $scope.vin = { text: subvin };
        $scope.hint = subvin.length + "/17";
    };
    $scope.searchClick = function() {
        var vin = $scope.vin.text;
        if (vin.length != 17) {
            alert("vin码长度应为17位");
        } else if (isLegalVin(vin)) {
            alert("vin码输入有误");
        } else {
            alert("ok");
        }
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});

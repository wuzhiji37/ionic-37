angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, Activities) {
    $scope.search = function() {
        $state.go("tab.search");
    };
    $scope.buyClick = function() {
        $state.go("buy");
    }
    $scope.activities = Activities.f3();
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

.controller('ReportCtrl', function($scope, $state, Reports) {
    if (localStorage.islogin != 1) {
        $state.go("tab.notlogin");
    }
    $scope.reports = Reports.all();
})

.controller('UserCtrl', function($scope, $state) {
    if (localStorage.islogin != 1) {
        $state.go("tab.notlogin");
    } else {
        $scope.user = JSON.parse(localStorage.user);
        $scope.toUserinfoClick = function() {
            $state.go("userinfo");
        }
        $scope.toAccountClick = function() {
            $state.go("account");
        }
        $scope.toActivityClick = function() {
            $state.go("activity");
        }
        $scope.toMessageClick = function() {
            $state.go("message");
        }
        $scope.toSettingClick = function() {
            $state.go("setting");
        }
    }
})

.controller('NotLoginCtrl', function($scope, $state) {
    if (localStorage.islogin == 1) {
        $state.go("tab.user");
    }
    $scope.toLoginClick = function() {
        $state.go("login");
    }
})

.controller('BuyCtrl', function($scope, $state, Packages, Payments) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.select = {
        package: 0,
        set: "1",
        payment: 0
    };
    $scope.total = {
        text: ""
    };
    $scope.packages = Packages.all();
    $scope.payments = Payments.all();

    $scope.pkgClick = function(id) {
        for (var i = 0; i < $scope.packages.length; i++) {
            var pId = $scope.packages[i].id;
            var pkgBtnId = "pkgBtn" + pId;
            var btn = document.getElementById(pkgBtnId);
            var pkgPriceId = "pkgPrice" + pId;
            var price = document.getElementById(pkgPriceId);
            var pkgLastId = "pkgLast" + pId;
            var last = document.getElementById(pkgLastId);
            if ($scope.packages[i].id == id) {
                btn.className = "button button-outline button-assertive";
                price.style.color = "red";
                last.style.color = "red";
            } else {
                btn.className = 'button button-outline button-dark';
                price.style.color = "black";
                last.style.color = "black";
            }
        }

        $scope.select.package = id;
        $scope.countPrice();
    }
    $scope.setChange = function() {
        var set = parseInt($scope.select.set);
        var plus = document.getElementById("plus");
        var minus = document.getElementById("minus");
        if (set <= 1 || isNaN(set)) {
            set = 1;
            plus.style.borderColor = "black";
            minus.style.borderColor = "red";
        } else if (set >= 999) {
            set = 999;
            plus.style.borderColor = "red";
            minus.style.borderColor = "black";
        } else {
            plus.style.borderColor = "black";
            minus.style.borderColor = "black";
        }

        $scope.select.set = set + "";
        $scope.countPrice();
    }
    $scope.plusClick = function() {
        $scope.select.set++;
        $scope.setChange();
    }
    $scope.minusClick = function() {
        $scope.select.set--;
        $scope.setChange();
    }
    $scope.payClick = function(id) {
        for (var i = 0; i < $scope.payments.length; i++) {
            var pId = $scope.payments[i].id;
            var selectId = "select" + pId;
            var selectImg = document.getElementById(selectId);
            if ($scope.payments[i].id == id) {
                selectImg.style.visibility = "visible";
            } else {
                selectImg.style.visibility = "hidden";
            }
        }

        $scope.select.payment = id;
    }
    $scope.countPrice = function() {
        var pkgPrice = Packages.get($scope.select.package).price;
        var set = parseInt($scope.select.set);
        $scope.total.text = "¥" + pkgPrice * set;
    }
    $scope.$on('$ionicView.afterEnter', function() {
        $scope.pkgClick(0);
        $scope.setChange();
        $scope.payClick(0);
    }, false);

})

.controller('LoginCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.toRegisterClick = function() {
        $state.go("register");
    }
    $scope.hint = {
        phone: "手机号",
        password: "密码"
    };
    $scope.loginClick = function() {
        localStorage.islogin = 1;
        localStorage.user = JSON.stringify({
            phone: 15900777419,
            email: "123@456.789",
            name: "ABC",
            gender: 1,
            account: 37
        });
        console.log(localStorage.user);
        $scope.goBack();
    }
    $scope.toForgetClick = function() {
        $state.go("forget");
    }
})

.controller('RegisterCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.hint = {
        phone: "手机号",
        email: "邮箱",
        password: "密码",
        confirm: "确认密码"
    };
})

.controller('ForgetCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.hint = {
        phone: "手机号",
        email: "邮箱"
    }

})

.controller('ChangePwdCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.hint = {
        password: "密码",
        confirm: "确认密码"
    };
})

.controller('UserinfoCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.user = JSON.parse(localStorage.user);
    $scope.toChangePwdClick = function() {
        $state.go("changePassword");
    }
    $scope.logoutClick = function() {
        localStorage.islogin = 0;
        $scope.goBack();
    }
})

.controller('AccountCtrl', function($scope, $state) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.user = JSON.parse(localStorage.user);
    var accounts = $scope.accounts = {
        moredata: true,
        messages: [],
        pagination: {
            perPage: 10,
            currentPage: 1
        },
        arr: [{
            task: "购买一次查询",
            time: "2016-01-01 00:00:00",
            sum: "100"
        }, {
            task: "获赠一次查询",
            time: "2016-01-01 00:00:00",
            sum: "0"
        }]
    }
})


.controller('ActivityCtrl', function($scope, $state, Activities) {
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.activities = Activities.all();
})

.controller('MessageCtrl', function($scope, $state, Messages){
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.messages = Messages.all();   
})

.controller('SettingCtrl', function($scope, $state){
    $scope.goBack = function() {
        window.history.back();
    }
});

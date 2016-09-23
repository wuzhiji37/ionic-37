angular.module('starter.services', [])

.factory('Reports', function() {
    var reports = [{
        brand: "上海大众",
        type: "上海大众-领驭 1.8T A/MT",
        vin: "123N7843NJ8NNKN8865N",
        time: "2016-04-19 08:01:00",
        status: "0"
    }, {
        brand: "上海大众",
        type: "上海大众-领驭 1.8T A/MT",
        vin: "123N7843NJ8NNKN8865N",
        time: "2016-04-19 08:01:00",
        status: "1"
    }];
    return {
        all: function() {
            return reports;
        }
    }
})

.factory('Activities', function() {
    var activities = [{
        image: "img/activity/xuncheji.png",
        id: 0
    }, {
        image: "img/activity/xuncheji.png",
        id: 1
    }];
    return {
        all: function() {
            return activities;
        },
        f3: function() {
            var arr3 = [];
            for (var i = 0; i < Math.min(3, activities.length); i++) {
                arr3[i] = activities[i];
            }
            return arr3;
        }
    }
})

.factory('Packages', function() {
    var packages = [{
        id: 0,
        price: 28,
        day: 30,
        times: 1
    }, {
        id: 1,
        price: 288,
        day: 180,
        times: 12
    }, {
        id: 2,
        price: 1088,
        day: 365,
        times: 50
    }];
    return {
        all: function() {
            return packages;
        },
        get: function(packageId) {
            for (var i = 0; i < packages.length; i++) {
                if (packages[i].id === parseInt(packageId)) {
                    return packages[i];
                }
            }
            return null;
        }
    };
})

.factory('Payments', function() {
    var payments = [{
        id: 0,
        name: "支付宝",
        image: "img/xcj_alipay.png"
    }, {
        id: 1,
        name: "微信",
        image: "img/xcj_wechat.png"
    }];
    return {
        all: function() {
            return payments;
        }
    };
})

.factory('Messages', function() {
    var messages = [{
        title: "版本更新",
        time: "2016-10-01 00:00:00",
        content: "1234567890qwertyu\niopasdfghjklzxcvbnm1234567890qw\nertyuiopasdfghjklzxcvbnm"
    }, {
        title: "活动消息",
        time: "2016-10-01 00:00:00",
        content: "1234567890qwertyuiopasdfghjklzxcvbnm"
    }, ];
    return {
        all: function() {
            return messages;
        }
    }
});

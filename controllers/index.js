var namaz = require("namazTab");
var jamat = require("jamatTab");
var radio = require("radioTab");
var colon = require("colonTab");

// Require the module
var Cloud = require("ti.cloud");


var deviceToken;

if (Ti.Platform.name == 'android') {
var CloudPush = require('ti.cloudpush');
 // These events monitor incoming push notifications

    CloudPush.retrieveDeviceToken({
        success : function deviceTokenSuccess(e) {
            subscribeToChannel(e);
        },
        error : function deviceTokenError(e) {
            subscribeError(e);
        }
    });
    CloudPush.addEventListener('callback', function (evt) {
        var and = JSON.parse(evt.payload);
        alert(and['android']['alert']);
    });
    CloudPush.showTrayNotificationsWhenFocused = true;

} else {
    Ti.Network.registerForPushNotifications({
        // Specifies which notifications to receive
        types: [
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: function deviceTokenSuccess(e) {
            subscribeToChannel(e);
        },
        error: function deviceTokenError(e) {
            subscribeError(e);
        }
        // callback: function (e) {
        //     var msg = JSON.parse(e.data);
        //     if (msg) {
        //         alert(msg);
        //     }
        // }
    });



}

function subscribeToChannel (e) {
    deviceToken = e.deviceToken;
    Ti.API.info('Device Token: ' + e.deviceToken);
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'alerts',
        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            Ti.API.info('Device Token subscribed: ' + e.deviceToken);
        } else {
            Ti.API.info('Device Token error subscrbie: ' + e.deviceToken);
        }
    });
}

function subscribeError(e) {
    Ti.API.info('Error: ' + e.deviceToken);
}

var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(radio.getRadioTab);
tabGroup.addTab(colon.getRadioTab);
tabGroup.addTab(namaz.getNamazTab);
tabGroup.addTab(jamat.getjamatTab);

tabGroup.open();
Ti.UI.setBackgroundImage( '/images/background.png' );

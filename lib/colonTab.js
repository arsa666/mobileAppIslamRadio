    // Require the module
var Cloud = require("ti.cloud");
var deviceToken;

//////////////Windows Creation //////////////////////////////
var win = Titanium.UI.createWindow({
    title:'Colon Radio',
    backgroundColor:'#000',
    layout: 'vertical',
    exitOnClose:true,
    backgroundImage:'images/colon.png',
});

//////////////Functions/////////////////////
function stopRadio () {
    Ti.API.info('STOP RADIO FUNCTION');

    audioPlayer.stop();
    makeEnabled(playButton);
    makeEnabled(arabeButton);

    makeDisabled(stopButton);
    if (Ti.Platform.osname === 'android')
    {
        audioPlayer.release();
    }
    msg.text = 'Radio Stopped';
}

function makeEnabled(btn){
    btn.enabled = true;
    btn.borderColor = '#0066FF';
    btn.backgroundColor = '#66FF33';
    btn.color ='#0066FF';

}

function makeEnabledPushButton(btn){
    btn.enabled = true;
    btn.borderColor = '#000';
    btn.backgroundColor = '#FFFF99';
    btn.color ='#000';

}

function makeDisabled (btn) {
    btn.enabled = false;
    btn.borderColor = '#787878';
    btn.backgroundColor = '#E0E0E0';
    btn.color = '#505050';
}

/////////// Radio Buttons and Labels//////////////////////////////////////////
var msg = Ti.UI.createLabel({
    color:"#FFF",
    top:20,
    font: {
        fontSize: 30,
        fontWeight: 'bold',

    },
    shadowColor: '#000',
    shadowOffset: {x:5, y:5},
    shadowRadius: 3,
});

var subscribeButton = Titanium.UI.createButton({
    title:'Recibir Alerts',
    top:15,
    width:200,
    height:60,
    font: {
        fontSize: 20
    },
    borderRadius:35,
    borderColor:'#000',
    backgroundColor:'#FFFF99',
    borderWidth:3,
    color:'#000',
    disabledColor:'#787878',

});

var unSubscribeButton = Titanium.UI.createButton({
    title:'No Recibir Alerts',
    top:15,
    width:200,
    height:60,
    font: {
        fontSize: 20
    },
    borderRadius:35,
    borderColor:'#787878',
    backgroundColor:'#E0E0E0',
    borderWidth:3,
    color:'#000',
    disabledColor:'#787878',

});

var playButton = Titanium.UI.createButton({
    title:'Español',
    top:15,
    width:200,
    height:60,
    font: {
        fontSize: 20
    },
    borderRadius:35,
    borderColor:'#0066FF',
    backgroundColor:'#66FF33',
    borderWidth:3,
    color:'#0066FF',
    disabledColor:'#787878',

});

var arabeButton = Titanium.UI.createButton({
    title:'Arabe',
    top:15,
    width:200,
    height:60,
    font: {
        fontSize: 20
    },
    borderRadius:35,
    borderColor:'#0066FF',
    backgroundColor:'#66FF33',
    borderWidth:3,
    color:'#0066FF',
    disabledColor:'#787878',

});

var stopButton = Titanium.UI.createButton({
    title:'Stop Radio',
    width:200,
    top:15,
    height:60,
    font: {
        fontSize: 20
    },
    borderRadius:35,
    borderColor:'#787878',
    backgroundColor:'#E0E0E0',
    borderWidth:3,
    color:'#505050',
    disabledColor:'#787878',
    enabled: false

});

var audioPlayer = Ti.Media.createAudioPlayer({
    url: 'http://162.243.80.141:8000/stream',
    allowBackground: true
});

/////////////////////Event Listeners ////////////////////////

subscribeButton.addEventListener('click', function () {
makeDisabled(subscribeButton);

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
    });
}});


unSubscribeButton.addEventListener('click', function () {
        Cloud.PushNotifications.unsubscribeToken({
        channel: 'colon',
        device_token: deviceToken
        }, function (e) {
            if (e.success) {
                makeDisabled(unSubscribeButton);
                makeEnabledPushButton(subscribeButton);
                alert('Ya no recibira push notificaciones de radio colon.');
            } else {
                alert('Error:\n' +
                    ((e.error && e.message) || JSON.stringify(e)));
            }
        });
});

function subscribeToChannel (e) {
    deviceToken = e.deviceToken;
    Ti.API.info('Device Token: ' + e.deviceToken);
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'colon',
        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            makeDisabled(subscribeButton);
            makeEnabledPushButton(unSubscribeButton);
            alert('Se ha registrado a radio colon correctamente, ahora recibira las notificaciones para esta radio.')
            Ti.API.info('Device Token subscribed: ' + e.deviceToken);
        } else {
            makeDisabled(unSubscribeButton);
            makeEnabledPushButton(subscribeButton);
            alert('Hubo un error en su registracion de radio colon, porfavor conectese al internet e intente denuevo.')
            Ti.API.info('Device Token error subscrbie: ' + e.deviceToken);
        }
    });
}

function subscribeError(e) {
    Ti.API.info('Error al registrar token: ' + e.deviceToken);
}

playButton.addEventListener('click',function() {//play button
    win.remove(msg);
    msg.text = 'Loading...';
    win.add(msg);
    makeDisabled(playButton);
    makeDisabled(arabeButton);
    makeEnabled(stopButton);

    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://162.243.80.141:8000/status.xsl');
    xhr.send();

    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled(stopButton);
        makeEnabled(playButton);
        makeEnabled(arabeButton);

        Ti.API.error('Bad Server =>' + e.error);
        msg.text = 'Radio Offline!';
        alert('Radio Colon en español no esta en vivo en este momento, intente a otras horas.');
        win.add(msg);
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            audioPlayer.url = 'http://162.243.80.141:8000/stream';
            audioPlayer.start();
            makeDisabled(playButton);
            makeDisabled(arabeButton);
            makeEnabled(stopButton);
        } else {
            stopRadio();
            msg.text = 'Radio Offline!';
            alert('Radio Colon en español no esta en vivo en este momento, intente a otras horas.');

        }
    };
});


/////////////////////Event Listeners ////////////////////////
arabeButton.addEventListener('click',function() {//play button
    win.remove(msg);
    msg.text = 'Loading...';
    win.add(msg);
    makeDisabled(playButton);
    makeDisabled(arabeButton);
    makeEnabled(stopButton);

    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://107.170.156.66:8000/status.xsl');
    xhr.send();

    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled(stopButton);
        makeEnabled(playButton);
        makeEnabled(arabeButton);

        Ti.API.error('Bad Server =>' + e.error);
        msg.text = 'Radio Offline!';
        alert('Radio Colon en arabe no esta en vivo en este momento, intente a otras horas.');

        win.add(msg);
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            audioPlayer.url = 'http://107.170.156.66:8000/stream';
            audioPlayer.start();
            makeDisabled(playButton);
            makeDisabled(arabeButton);
            makeEnabled(stopButton);
        } else {
            stopRadio();
            msg.text = 'Radio Offline!';
            alert('Radio Colon en arabe no esta en vivo en este momento, intente a otras horas.');

        }
    };
});

stopButton.addEventListener('click', function() { //stop button
    stopRadio();
});

audioPlayer.addEventListener('change',function(e){
    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
    var state = e.state;
    if (state === 6 || state === 7) { //stoping and stopped states
        stopRadio();
    } else if (state === 0) {//initial state
        msg.text = 'Radio Stopped';
    } else if (state === 4) {
        msg.text = 'Playing...';
    }
});



///////////////// Windows add bottons and Labels ////////////////
win.add(subscribeButton);
win.add(unSubscribeButton);
win.add(playButton);
win.add(arabeButton);
win.add(stopButton);

///////////////// Expert the Radio Tab ////////////////////////
exports.getRadioTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Colon Radio',
        window:win
});


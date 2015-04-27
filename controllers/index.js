	// // var Cloud = require("ti.cloud");
// // var jamaToken = null;
// // var colonToken = null;

if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad')
var service = Ti.App.iOS.registerBackgroundService({url:'bg-service1.js'});

// //variables
Ti.App.audioPlayer = Ti.Media.createAudioPlayer({
    allowBackground: true
});


// // // function subscribeJama () {
// // //     if (jamaToken === null){
// // //         if (Ti.Platform.name == 'android') {
// // //         var CloudPush = require('ti.cloudpush');
// // //          // These events monitor incoming push notifications
// // //             CloudPush.retrieveDeviceToken({
// // //                 success : function deviceTokenSuccess(e) {
// // //                     subscribeToChannelJama(e);
// // //                 },
// // //                 error : function deviceTokenError(e) {
// // //                     subscribeError(e);
// // //                 }
// // //             });
// // //             CloudPush.addEventListener('callback', function (evt) {
// // //                 var and = JSON.parse(evt.payload);
// // //                 //alert(and['android']['alert']);
// // //             });
// // //             CloudPush.showTrayNotificationsWhenFocused = true;

// // //         } else {
// // //             Ti.Network.registerForPushNotifications({
// // //                 // Specifies which notifications to receive
// // //                 types: [
// // //                     Ti.Network.NOTIFICATION_TYPE_BADGE,
// // //                     Ti.Network.NOTIFICATION_TYPE_ALERT,
// // //                     Ti.Network.NOTIFICATION_TYPE_SOUND
// // //                 ],
// // //                 success: function deviceTokenSuccess(e) {
// // //                     subscribeToChannelJama(e);
// // //                 },
// // //                 error: function deviceTokenError(e) {
// // //                     subscribeError(e);
// // //                 }
// // //             });
// // //         }
// // //     }
// // // };

// // // function subscribeColon () {
// // //     if (colonToken === null){
// // //         if (Ti.Platform.name == 'android') {
// // //         var CloudPush = require('ti.cloudpush');
// // //          // These events monitor incoming push notifications
// // //             CloudPush.retrieveDeviceToken({
// // //                 success : function deviceTokenSuccess(e) {
// // //                     subscribeToChannelColon(e);
// // //                 },
// // //                 error : function deviceTokenError(e) {
// // //                     subscribeError(e);
// // //                 }
// // //             });
// // //             CloudPush.addEventListener('callback', function (evt) {
// // //                 var and = JSON.parse(evt.payload);
// // //                 //alert(and['android']['alert']);
// // //             });
// // //             CloudPush.showTrayNotificationsWhenFocused = true;

// // //         } else {
// // //             Ti.Network.registerForPushNotifications({
// // //                 // Specifies which notifications to receive
// // //                 types: [
// // //                     Ti.Network.NOTIFICATION_TYPE_BADGE,
// // //                     Ti.Network.NOTIFICATION_TYPE_ALERT,
// // //                     Ti.Network.NOTIFICATION_TYPE_SOUND
// // //                 ],
// // //                 success: function deviceTokenSuccess(e) {
// // //                     subscribeToChannelColon(e);
// // //                 },
// // //                 error: function deviceTokenError(e) {
// // //                     subscribeError(e);
// // //                 }
// // //             });
// // //         }
// // //     }
// // // };

// // // function subscribeError(e) {
// // //     Ti.API.info('Error al registrar token: ' + e.deviceToken);
// // // };


// // // function subscribeToChannelJama (e) {
// // //     jamaToken = e.deviceToken;
// // //     Cloud.PushNotifications.subscribeToken({
// // //         device_token: jamaToken,
// // //         channel: 'jama_prod',
// // //         type: Ti.Platform.name == 'android' ? 'android' : 'ios'
// // //     }, function (e) {
// // //         if (e.success) {
// // //             alert('Se ha registrado correctamente, ahora recibira las notificaciones para esta radio.')
// // //             Ti.API.info('Device Token subscribed: ' + e.deviceToken);
// // //         } else {
// // //             alert('Hubo un error en su registracion, porfavor conectese al internet e intente denuevo.')
// // //             Ti.API.info('Device Token error subscrbie: ' + e.deviceToken);
// // //         }
// // //     });
// // // };

// // // function subscribeToChannelColon (e) {
// // //     colonToken = e.deviceToken;
// // //     Cloud.PushNotifications.subscribeToken({
// // //         device_token: colonToken,
// // //         channel: 'colon_prod',
// // //         type: Ti.Platform.name == 'android' ? 'android' : 'ios'
// // //     }, function (e) {
// // //         if (e.success) {
// // //             alert('Se ha registrado correctamente, ahora recibira las notificaciones para esta radio.')
// // //             Ti.API.info('Device Token subscribed: ' + e.deviceToken);
// // //         } else {
// // //             alert('Hubo un error en su registracion, porfavor conectese al internet e intente denuevo.')
// // //             Ti.API.info('Device Token error subscrbie: ' + e.deviceToken);
// // //         }
// // //     });
// // // };

// // // function unSubscribeColon() {
// // //     Cloud.PushNotifications.unsubscribeToken({
// // //     channel: 'colon_prod',
// // //     device_token: colonToken
// // //     }, function (e) {
// // //         if (e.success) {
// // //             alert('Ya no recibira push notificaciones de Radio Colon.');
// // //             colonToken = null;
// // //         } else {
// // //             Ti.API.info('Error:\n' +
// // //                 ((e.error && e.message) || JSON.stringify(e)));
// // //         }
// // //     });
// // // };

// // // function unSubscribeJama() {
// // //     Cloud.PushNotifications.unsubscribeToken({
// // //     channel: 'jama_prod',
// // //     device_token: jamaToken
// // //     }, function (e) {
// // //         if (e.success) {
// // //             alert('Ya no recibira push notificaciones de radio Jama.');
// // //             jamaToken = null;
// // //         } else {
// // //             Ti.API.info('Error:\n' +
// // //                 ((e.error && e.message) || JSON.stringify(e)));
// // //         }
// // //     });
// // // };



// // // $.setSwitchState.addEventListener('focus', function (e) {
// // //    var jamaNotifications =  Ti.App.Properties.getBool('switchJamaNotifications');
// // //    var colonNotifications =  Ti.App.Properties.getBool('switchColonNotifications');

// // //    if (jamaNotifications !== null) {
// // //         $.jamaSwitch.value = jamaNotifications;
// // //    }
// // //    if (colonNotifications !== null) {
// // //         $.colonSwitch.value = colonNotifications;
// // //    }
// // // });

// // // function switchJamaNotifications(e) {
// // //     var val = e.value;
// // //     if (val === true && Ti.App.Properties.getBool('switchJamaNotifications') === false) {
// // //         Ti.App.Properties.setBool('switchJamaNotifications', true);
// // //         subscribeJama();
// // //     } else {
// // //         Ti.App.Properties.setBool('switchJamaNotifications', false);
// // //         unSubscribeJama();
// // //     }
// // // };

// // // function switchColonNotifications(e) {
// // //     var val = e.value;
// // //     if (val === true && Ti.App.Properties.getBool('switchColonNotifications') === false) {
// // //         Ti.App.Properties.setBool('switchColonNotifications', true);
// // //         subscribeColon();
// // //     } else {
// // //         Ti.App.Properties.setBool('switchColonNotifications', false);
// // //         unSubscribeColon();
// // //     }
// // // };


//disabled the btn passed in
function makeDisabled (btn) {
    btn.enabled = false;
    btn.borderColor = '#787878';
    btn.backgroundColor = '#E0E0E0';
    btn.color = '#505050';
}

//enable the btn
function makeEnabled(btn){
    btn.enabled = true;
    btn.borderColor = '#0066FF';
    btn.backgroundColor = '#66FF33';
    btn.color ='#0066FF';

}

//open website
function openWeb() {
    Ti.Platform.openURL("http://www.islamenpanama.com");
};

function loadDua(url) {
    Ti.Platform.openURL(url);
}

function removeChildrens(objeto) {
    for (i in objeto.children) {
        var child=objeto.children[0];
        removeChildrens(child);
        objeto.remove(child);
        child=null;
    }
}

//get salat and jamat times as json REST API
function searchDuas(e){
    Titanium.API.info("Searching Duas");
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.onerror = function(e){
        Ti.API.error('Bad Server =>' + e.error);
        alert('Porfavor asegurese de estar conectado al Internet');
    };

    xhr.open('GET', 'http://107.170.87.104/islamApi/dua_list.php');
    xhr.send();
    xhr.onload = function(){
        Ti.API.info('Getting duad and url');
        response = JSON.parse(this.responseText);
        removeChildrens($.duaScrollView);
        for(var key in response){
        	var button = Titanium.UI.createButton({
			   title: key,
			   width: 100,
			   height: 50,
			   borderRadius:25,
			    borderColor:'#0066FF',
			    backgroundColor:'#FFF',
			    borderWidth:3,
			    color:'#0066FF',
			    disabledColor:'#787878',
			    width:180,
			    height:60,
			    font: {
			        fontSize: 25,
			        fontWeight: 'bold',
			        fontFamily: 'Helvetica Neue'
			    },
			    disabledColor:'#787878',
			    top:5
			});
			button.addEventListener('click',function(e)
			{
			   var jsonKey = e.source.title;
			   loadDua(response[jsonKey]);
			   
			});
			$.duaScrollView.add(button);
        }
    };
};

//get salat and jamat times as json REST API
function searchSalat(e){
    Titanium.API.info("You clicked the button");
    $.salatDia.text = 'Dia...';
    $.salatMes.text = 'Mes...';
    $.salatFajr.text = 'Fajr ...';
    $.salatZohar.text = 'Zohar ...';
    $.salatAsar.text = 'Asar ...';
    $.salatMagrib.text = 'Magrib ...';
    $.salatIsha.text = 'Isha ...';
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.onerror = function(e){
        Ti.API.error('Bad Server =>' + e.error);
        alert('Porfavor asegurese de estar conectado al Internet');
    };

    xhr.open('GET', 'http://107.170.87.104/islamApi/namazDaily.php');
    xhr.send();
    xhr.onload = function(){
        Ti.API.info('Getting new times');
        response = JSON.parse(this.responseText);
        $.salatDia.text = 'Dia: ' + response['dia'];
        $.salatMes.text = 'Mes: ' + response['mes'];
        $.salatFajr.text = 'Fajr: ' + response['fajr'] + ' A.M';
        $.salidaSol.text = 'Salida Sol: ' + response['salidaSol'] + ' A.M';
        $.salatZohar.text = 'Zohar: ' + response['zohar'] + ' P.M';
        $.salatAsar.text = 'Asar: ' + response['asar'] + ' P.M';
        $.salatMagrib.text = 'Magrib: ' + response['magrib'] + ' P.M';
        $.salatIsha.text = 'Isha: ' + response['isha'] + ' P.M';
    };
};


//turn jama radio on
function jamaRadioOn(e) {
    stopRadio();
    $.radioStatus.text = 'Loading...';
    makeDisabled($.jamaRadioOn);
    makeEnabled($.jamaRadioOff);
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://107.170.87.104:8000/status.xsl');
    xhr.send();


    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled($.jamaRadioOff);
        makeEnabled($.jamaRadioOn);

        Ti.API.error('Bad Server =>' + e.error);
        $.radioStatus.text = 'Radio Offline!';
        alert('Asegurese de estar conectado a internet.');
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            Ti.App.audioPlayer.url = 'http://107.170.87.104:8000/stream';
            Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
            Ti.App.audioPlayer.start();
            makeDisabled($.jamaRadioOn);
            makeEnabled($.jamaRadioOff);
            $.radioStatus.text = 'En Vivo...';
        } else {
            alert('Radio solo esta en vivo Lunes y Miercoles entre Magrib e Isha y Viernes en Zohar');
            $.radioStatus.text = 'Apagado';
            makeDisabled($.jamaRadioOff);
            makeEnabled($.jamaRadioOn);
        }
    };
};

//turn colon radio on
function colonRadioOn(e) {
    stopRadio();
    $.radioStatusColon.text = 'Loading...';
    makeDisabled($.colonRadioOn);
    makeDisabled($.colonRadioArabeOn);
    makeEnabled($.colonRadioOff);
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://162.243.80.141:8000/status.xsl');
    xhr.send();


    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled($.colonRadioOff);
        makeEnabled($.colonRadioOn);
        makeEnabled($.colonRadioArabeOn);


        Ti.API.error('Bad Server =>' + e.error);
        $.radioStatusColon.text = 'Radio Offline!';
        alert('Asegurese de estar conectado a internet.');
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            Ti.App.audioPlayer.url = 'http://162.243.80.141:8000/stream';
            Ti.App.audioPlayer.start();
            makeDisabled($.colonRadioOn);
            makeDisabled($.colonRadioArabeOn);
            makeEnabled($.colonRadioOff);
            $.radioStatusColon.text = 'En Vivo...';
        } else {
            alert('Radio colon español no esta en vivo en este momento, intente a otras horas.');
            $.radioStatusColon.text = 'Apagado';
            makeDisabled($.colonRadioOff);
            makeEnabled($.colonRadioArabeOn);
            makeEnabled($.colonRadioOn);
        }
    };
};

//turn colon radio on
function colonRadioArabeOn(e) {
    stopRadio();
    $.radioStatusColon.text = 'Loading...';
    makeDisabled($.colonRadioOn);
    makeDisabled($.colonRadioArabeOn);
    makeEnabled($.colonRadioOff);
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://107.170.156.66:8000/status.xsl');
    xhr.send();


    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled($.colonRadioOff);
        makeEnabled($.colonRadioOn);

        Ti.API.error('Bad Server =>' + e.error);
        $.radioStatusColon.text = 'Radio Offline!';
        alert('Asegurese de estar conectado a internet.');
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            Ti.App.audioPlayer.url = 'http://107.170.156.66:8000/stream';
            Ti.App.audioPlayer.start();
            makeDisabled($.colonRadioOn);
            makeEnabled($.colonRadioOff);
            $.radioStatusColon.text = 'En Vivo...';
        } else {
            alert('Radio colon arabe no esta en vivo en este momento, intente a otras horas.');
            $.radioStatusColon.text = 'Apagado';
            makeDisabled($.colonRadioOff);
            makeEnabled($.colonRadioOn);
            makeEnabled($.colonRadioArabeOn);

        }
    };
};

function stopRadio(e){
    Ti.App.audioPlayer.stop();
    if (Ti.Platform.osname === 'android')
    {
        Ti.App.audioPlayer.release();
    }
};

function jamaRadioOff(e) {
    Ti.API.info('STOP RADIO FUNCTION');
    stopRadio(e);
    makeEnabled($.jamaRadioOn);
    makeDisabled($.jamaRadioOff);
    $.radioStatus.text = 'Apagado';
};

function colonRadioOff(e) {
    Ti.API.info('STOP RADIO FUNCTION');
    stopRadio(e);
    makeEnabled($.colonRadioOn);
    makeEnabled($.colonRadioArabeOn);
    makeDisabled($.colonRadioOff);
    $.radioStatusColon.text = 'Apagado';
};





$.index.open();

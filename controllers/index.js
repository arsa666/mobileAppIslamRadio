//variables
var audioPlayerJama = Ti.Media.createAudioPlayer({
    url: 'http://107.170.87.104:8000/stream',
    allowBackground: true
});

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
        $.salatZohar.text = 'Zohar: ' + response['zohar'] + ' P.M';
        $.salatAsar.text = 'Asar: ' + response['asar'] + ' P.M';
        $.salatMagrib.text = 'Magrib: ' + response['magrib'] + ' P.M';
        $.salatIsha.text = 'Isha: ' + response['isha'] + ' P.M';
    }
};


//turn jama radio on
function jamaRadioOn(e) {

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
            audioPlayerJama.start();
            makeDisabled($.jamaRadioOn);
            makeEnabled($.jamaRadioOff);
            $.radioStatus.text = 'En Vivo...';
        } else {
            alert('Radio jama no esta en vivo en este momento, intente a otras horas.');
            $.radioStatus.text = 'Apagado';
            makeDisabled($.jamaRadioOff);
            makeEnabled($.jamaRadioOn);
        }
    };
};


function jamaRadioOff(e) {
    Ti.API.info('STOP RADIO FUNCTION');
    audioPlayerJama.stop();
    makeEnabled($.jamaRadioOn);
    makeDisabled($.jamaRadioOff);
    if (Ti.Platform.osname === 'android')
    {
        audioPlayerJama.release();
    }
    alert('Radio Apagado');
    $.radioStatus.text = 'Apagado';
};


$.index.open();

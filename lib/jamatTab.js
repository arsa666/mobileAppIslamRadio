var common = require("common");

var jamatWin = Titanium.UI.createWindow({
    title:'Jamaat Jummah Masgid',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true,
    backgroundImage:'images/jamaat.jpg',
});

var fajr = common.namazRowAppendWindow(jamatWin, 'Fajr ', true);
var zohar = common.namazRowAppendWindow(jamatWin, 'Zohar ', true);
var asar = common.namazRowAppendWindow(jamatWin, 'Asar ', true);
var magrib = common.namazRowAppendWindow(jamatWin, 'Magrib', true);
var isha = common.namazRowAppendWindow(jamatWin, 'Isha', true);

function refreshJamatTimes() {
    fajr.text = 'Fajr ...';
    zohar.text = 'Zohar ...';
    asar.text = 'Asar ...';
    magrib.text = 'Magrib ...';
    isha.text = 'Isha ...';
    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.onerror = function(e){
        Ti.API.error('Bad Server =>' + e.error);
    };

    xhr.open('GET', Alloy.Globals.jamatTimes);
    xhr.send();
    xhr.onload = function(){
        Ti.API.info('Getting new times');
        response = JSON.parse(this.responseText);
        fajr.text = 'Fajr ' + response['fajr'] + ' A.M';
        zohar.text = 'Zohar ' + response['zohar'] + ' P.M';
        asar.text = 'Asar ' + response['asar'] + ' P.M';
        magrib.text = 'Magrib ' + response['magrib'] + ' P.M';
        isha.text = 'Isha ' + response['isha'] + ' P.M';
    }
};

////////////////Jamat Times/////////////////////////////////
var refreshBtn = Titanium.UI.createButton({
    title:'Refresh',
    top:20,
    width:200,
    height:70,
    font: {
        fontSize: 25
    },
    borderRadius:35,
    borderColor:'#0066FF',
    backgroundColor:'#FFF',
    borderWidth:3,
    color:'#0066FF',
    disabledColor:'#787878',
});

jamatWin.add(refreshBtn);


refreshJamatTimes();

refreshBtn.addEventListener('click', function() {
    refreshJamatTimes();
});

exports.getjamatTab  = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Jamaat',
        window:jamatWin,
        font: {
        fontSize: 40
    },
});
var common = require("common");

var jamatWin = Titanium.UI.createWindow({
    title:'Jamat Times/Horario',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

function refreshJamatTimes(tableJamat) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onerror = function(e){
        Ti.API.error('Bad Server =>' + e.error);
    };

    xhr.open('GET', Alloy.Globals.jamatTimes);
    xhr.send();
    tableJamat.setData([]);
    xhr.onload = function(){
        response = JSON.parse(this.responseText);
        var data = [
            {title:"Fajr: " + response['fajr'] + " a.m", color: '#404040',font:{
            fontSize: common.fontSize,
            fontWeight: 'bold'
        }},
            {title:"Zohar: " + response['zohar'] + " p.m", color: '#404040',font:{
            fontSize: common.fontSize,
            fontWeight: 'bold'
        }},
            {title:"Asar: " + response['asar'] + " p.m", color: '#404040',font:{
            fontSize: common.fontSize,
            fontWeight: 'bold'
        }},
            {title:"Magrib: " + response['magrib'] + " p.m", color: '#404040',font:{
            fontSize: common.fontSize,
            fontWeight: 'bold'
        }},
            {title:"Isha: " + response['isha'] + " p.m", color: '#404040',font:{
            fontSize: common.fontSize,
            fontWeight: 'bold'
        }}
            ];
        tableJamat.setData(data);
    }
};

////////////////Jamat Times/////////////////////////////////

var tableJamat =  Titanium.UI.createTableView({});
refreshJamatTimes(tableJamat);
var refreshBtn = Titanium.UI.createButton({
    title:'Refresh',
    width:300,
    height:40
});
jamatWin.add(refreshBtn);
jamatWin.add(tableJamat);

refreshBtn.addEventListener('click', function() {
    refreshJamatTimes(tableJamat);
});

exports.getjamatTab  = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Jamat Times',
        window:jamatWin
});
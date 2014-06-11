//Global Variables.
var fontSize = '30sp';


//Common Functions
function getDate(query) {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    if(query === 'month'){
        return month;
    } else if (query === 'day'){
        return day;
    } else {
        return day+"/"+month+"/"+year;
    }
}


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
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
            {title:"Zohar: " + response['zohar'] + " p.m", color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
            {title:"Asar: " + response['asar'] + " p.m", color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
            {title:"Magrib: " + response['magrib'] + " p.m", color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
            {title:"Isha: " + response['isha'] + " p.m", color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }}
            ];
        tableJamat.setData(data);
    }
}
Ti.include("common.js");

var tabGroup = Titanium.UI.createTabGroup();


// create tab group


//////////////Windows Creation //////////////////////////////
var win = Titanium.UI.createWindow({
    title:'Islam Radio',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

var namazWin = Titanium.UI.createWindow({
    title:'Namaz Times/Horario',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

var jamatWin = Titanium.UI.createWindow({
    title:'Jamat Times/Horario',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

///////////////// Namaz Times/////////////////////////////

//To make the program work you will need to have added the NamazTimes.sqlite file to Resources/myData
Ti.Database.install('/NamazTimes.sqlite', 'NamazTimes');
var db = Ti.Database.open('NamazTimes');
var dayValues = db.execute('select * from NamazTimes where mes=' + getDate('month') + ' and dia='+getDate('day') + ';');

while (dayValues.isValidRow()){
    var fajr = dayValues.fieldByName('Fazar');
    var zohar = dayValues.fieldByName('Zohar');
    var asar = dayValues.fieldByName('Asar');
    var magrib = dayValues.fieldByName('Magrib');
    var isha = dayValues.fieldByName('Isha');
    dayValues.next();
}

dayValues.close();
db.close();

var date = Ti.UI.createLabel({
	color:'#CC9900',
	text: getDate(),
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    font:{
        fontFamily:'Verdana',
        fontWeight:'bold',
        fontSize:14
    },
    shadowColor:'#333',
    shadowOffset:{x:1,y:1},
    width:Ti.Platform.displayCaps.platformWidth,
    height:20
});

var table1 =  Titanium.UI.createTableView({
    data:[
        {title:"Fajr: " + fajr + " a.m",
        color: '#404040',
        font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }
       },
        {title:"Zohar: " + zohar + " p.m",color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
        {title:"Asar: " + asar + " p.m",color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
        {title:"Magrib: " + magrib + " p.m",color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }},
        {title:"Isha:  " + isha + " p.m",color: '#404040',font:{
            fontSize: fontSize,
            fontWeight: 'bold'
        }}
    ]
});



namazWin.add(date);
namazWin.add(table1);
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



/////////// Radio//////////////////////////////////////////
var playButton = Titanium.UI.createButton({
    title:'Play Radio/Iniciar Radio',
    top:10,
    width:300,
    height:40
});

var stopButton = Titanium.UI.createButton({
    title:'Stop Radio/Parar Radio',
    top:10,
    width:300,
    height:40,
    enabled: false
});

var webViewButton = Titanium.UI.createButton({
	title:'Web View/Ver en Web',
    top:50,
    width:300,
    height:40
});

var audioPlayer = Ti.Media.createAudioPlayer({
    url: 'http://107.170.87.104:8000/stream',
    allowBackground: true
});

playButton.addEventListener('click',function() {
    audioPlayer.start();
    playButton.enabled = false;
    stopButton.enabled = true;
});

stopButton.addEventListener('click', function() {
    audioPlayer.stop();
    playButton.enabled = true;
    stopButton.enabled = false;
    if (Ti.Platform.osname === 'android')
    {
        audioPlayer.release();
    }
});

webViewButton.addEventListener('click', function() {

    if (Ti.Platform.osname === 'android')
    {
        Ti.Platform.openURL(Alloy.Globals.mp3Url);
    } else {
        var webview = Titanium.UI.createWebView({url:Alloy.Globals.mp3Url});
        var window = Titanium.UI.createWindow();
        window.add(webview);
        window.open({modal:true});
    }

});

audioPlayer.addEventListener('progress',function(e) {
    Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
});

audioPlayer.addEventListener('change',function(e)
{
    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
});


win.add(playButton);
win.add(stopButton);
win.add(webViewButton);


///////////////Tab Creation////////////////////////////
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Radio',
    window:win
});

var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Namaz Times',
    window:namazWin
});

var tab3 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Jamat Times',
    window:jamatWin
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.open();

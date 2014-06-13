//////////////Windows Creation //////////////////////////////
var win = Titanium.UI.createWindow({
    title:'Islam Radio',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
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

audioPlayer.addEventListener('change',function(e){
    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
});


win.add(playButton);
win.add(stopButton);
win.add(webViewButton);

exports.getRadioTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Radio',
        window:win
});


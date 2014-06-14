//////////////Windows Creation //////////////////////////////
var win = Titanium.UI.createWindow({
    title:'Islam Radio',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

//////////////Functions/////////////////////
function stopRadio () {
    Ti.API.info('STOP RADIO FUNCTION');

    audioPlayer.stop();
    makeEnabled(playButton);
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

function makeDisabled (btn) {
    btn.enabled = false;
    btn.borderColor = '#787878';
    btn.backgroundColor = '#E0E0E0';
}

/////////// Radio Buttons and Labels//////////////////////////////////////////
var msg = Ti.UI.createLabel({
	color:"#E60000",
    top:20,
    font: {
        fontSize: 25
    },
});

var playButton = Titanium.UI.createButton({
    title:'Play Radio',
    top:100,
    width:200,
    height:70,
    font: {
        fontSize: 25
    },
    borderRadius:10,
    borderColor:'#0066FF',
    backgroundColor:'#66FF33',
    borderWidth:2,
    color:'#0066FF',
    disabledColor:'#787878',
});

var stopButton = Titanium.UI.createButton({
    title:'Stop Radio',
    top:10,
    width:200,
    height:70,
    font: {
        fontSize: 25
    },
    borderRadius:10,
    borderColor:'#787878',
    backgroundColor:'#E0E0E0',
    borderWidth:2,
    disabledColor:'#787878',
    enabled: false
});

var audioPlayer = Ti.Media.createAudioPlayer({
    url: Alloy.Globals.mp3Url,
    allowBackground: true
});

/////////////////////Event Listeners ////////////////////////

playButton.addEventListener('click',function() {//play button
    win.remove(msg);
    msg.text = 'Loading...';
    win.add(msg);
    makeDisabled(playButton);
    makeEnabled(stopButton);

	var xhr = Ti.Network.createHTTPClient({
		cache:false
	});
    xhr.open('GET', Alloy.Globals.serverStatus);
    xhr.send();

	xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

		Ti.API.info(xhr.status);
        makeDisabled(stopButton);
        makeEnabled(playButton);
        Ti.API.error('Bad Server =>' + e.error);
        msg.text = 'Error: Server is Offline! Please report to: islamenpanama@gmail.com';
        win.add(msg);
    };

    xhr.onload = function(){
        var response = this.responseText.indexOf('class="streamdata"');
        if (response !== -1) {
            Ti.API.info('SERVER ON');
            audioPlayer.start();
            makeDisabled(playButton);
            makeEnabled(stopButton);
        } else {
            stopRadio();
            msg.text = 'Server OFFLINE!';
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
        msg.text = 'Radio Stopped.';
    } else if (state === 4) {
        setInterval(function(){msg.text = 'Live Playing...';},4000);
    }
});



///////////////// Windows add bottons and Labels ////////////////
win.add(playButton);
win.add(stopButton);

///////////////// Expert the Radio Tab ////////////////////////
exports.getRadioTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Radio',
        window:win
});


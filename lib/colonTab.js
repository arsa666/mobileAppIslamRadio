//////////////Windows Creation //////////////////////////////
var win = Titanium.UI.createWindow({
    title:'Colon Radio',
    backgroundColor:'#000',
    layout: 'vertical',
    exitOnClose:true,
    backgroundImage:'images/background.jpg',
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
    btn.color = '#505050';
}

/////////// Radio Buttons and Labels//////////////////////////////////////////
var msg = Ti.UI.createLabel({
    color:"#FFF",
    top:20,
    font: {
        fontSize: 45,
        fontWeight: 'bold',

    },
    shadowColor: '#000',
    shadowOffset: {x:5, y:5},
    shadowRadius: 3,
});

var playButton = Titanium.UI.createButton({
    title:'Play Radio',
    top:20,
    width:200,
    height:70,
    font: {
        fontSize: 25
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
    top:20,
    width:200,
    height:70,
    font: {
        fontSize: 25
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
playButton.addEventListener('click',function() {//play button
    win.remove(msg);
    msg.text = 'Loading...';
    win.add(msg);
    makeDisabled(playButton);
    makeEnabled(stopButton);

    var xhr = Ti.Network.createHTTPClient({cache:false});
    xhr.open('GET', 'http://162.243.80.141:8000/status.xsl');
    xhr.send();

    xhr.onerror = function(e) {
        Ti.API.info('ON ERROR');

        Ti.API.info(xhr.status);
        makeDisabled(stopButton);
        makeEnabled(playButton);
        Ti.API.error('Bad Server =>' + e.error);
        msg.text = 'Radio Offline!';
        alert('Radio no esta en vivo en este momento, intente a otras horas.');
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
            msg.text = 'Radio Offline!';
            alert('Radio no esta en vivo en este momento, intente a otras horas.');
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
win.add(playButton);
win.add(stopButton);

///////////////// Expert the Radio Tab ////////////////////////
exports.getRadioTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Colon Radio',
        window:win
});


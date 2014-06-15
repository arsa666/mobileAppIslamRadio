//Global variables.
exports.fontSize = '30sp';

//Common Functions
exports.getDate = function (query) {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    if(query === 'month'){
        return month;
    } else if (query === 'day'){
        return day;
    } else {
        return '-' + day + "/" + month + "/" + year + '-';
    }
}

exports.namazRowAppendWindow = function (win, text, inverse) {
    var label = Ti.UI.createLabel({
        text:text,
        textAlign:  Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        top: 20,
        font:  {fontSize: 30,fontWeight: 'bold'},
        width: Ti.Platform.displayCaps.platformWidth,
        shadowColor:'#FFF',
        shadowOffset:{x:3,y:3},
    });

    if (inverse === true) {
        label.color = '#fff';
        label.shadowColor = '#000';
    }
    win.add(label);
    return label;
}


exports.appendDate = function (win) {
    var date = Ti.UI.createLabel({
        color:'#FFF',
        text: this.getDate(),
        top:20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        textStyle: Titanium.UI.TEXT_STYLE_HEADLINE,
        font:{
            fontWeight:'bold',
            fontSize:40,
        },
        shadowColor:'#000',
        shadowRadius: 10,
        width:Ti.Platform.displayCaps.platformWidth,
    });
    win.add(date);

}



var namazWin = Titanium.UI.createWindow({
    title:'Namaz Times/Horario',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});

///////////////// Namaz Times/////////////////////////////
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

var namazTable =  Titanium.UI.createTableView({
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
namazWin.add(namazTable);


function getNamazTab () {
    var namazTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Namaz Times',
        window:namazWin
    });

    return namazTab;
}
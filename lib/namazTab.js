// var common = require("common");

// var namazWin = Titanium.UI.createWindow({
//     title:'Namaz Times/Horario',
//     backgroundColor:'#000',
//     layout: 'vertical',
//     exitOnClose:true,
//     backgroundImage:'images/madinaMasgid.jpg',
// });

// ////////////////////Functions//////////////////////////////

// ///////////////// Namaz Times/////////////////////////////
// Ti.Database.install('/NamazTimes.sqlite', 'NamazTimes');
// var db = Ti.Database.open('NamazTimes');
// var dayValues = db.execute('select * from NamazTimes where mes=' + common.getDate('month') + ' and dia='+common.getDate('day') + ';');

// while (dayValues.isValidRow()){
//     var fajr = dayValues.fieldByName('Fazar');
//     var zohar = dayValues.fieldByName('Zohar');
//     var asar = dayValues.fieldByName('Asar');
//     var magrib = dayValues.fieldByName('Magrib');
//     var isha = dayValues.fieldByName('Isha');
//     dayValues.next();
// }

// dayValues.close();
// db.close();

// common.appendDate(namazWin);
// common.namazRowAppendWindow(namazWin, 'Fajr ' + fajr + ' A.M');
// common.namazRowAppendWindow(namazWin, 'Zohar ' + zohar + ' P.M');
// common.namazRowAppendWindow(namazWin, 'Asar ' + asar + ' P.M');
// common.namazRowAppendWindow(namazWin, 'Magrib ' + magrib + ' P.M');
// common.namazRowAppendWindow(namazWin, 'Isha ' + isha + ' P.M');

// exports.getNamazTab = Titanium.UI.createTab({
//         icon:'KS_nav_views.png',
//         title:'Namaz',
//         window:namazWin
// });

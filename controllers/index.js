//var namaz = require("namazTab");
var jamat = require("jamatTab");
var radio = require("radioTab");
var colon = require("colonTab");



var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(radio.getRadioTab);
tabGroup.addTab(colon.getRadioTab);
//tabGroup.addTab(namaz.getNamazTab);
tabGroup.addTab(jamat.getjamatTab);

tabGroup.open();
Ti.UI.setBackgroundImage( '/images/background.png' );

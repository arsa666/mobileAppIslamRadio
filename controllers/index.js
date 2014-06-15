var namaz = require("namazTab");
var jamat = require("jamatTab");
var radio = require("radioTab");
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(radio.getRadioTab);
tabGroup.addTab(namaz.getNamazTab);
tabGroup.addTab(jamat.getjamatTab);
tabGroup.open();
Ti.UI.setBackgroundImage( '/images/background.png' );

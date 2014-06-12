var namaz = require("namazTab");
var jamat = require("jamatTab");
var radio = require("radioTab");
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(namaz.getNamazTab);
tabGroup.addTab(jamat.getjamatTab);
tabGroup.addTab(radio.getRadioTab);

tabGroup.open();

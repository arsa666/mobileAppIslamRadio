Ti.include("common.js");
Ti.include("namazTab.js");
Ti.include("jamatTab.js");
Ti.include("radioTab.js");
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(getNamazTab());
tabGroup.addTab(getJamatTab());
tabGroup.addTab(getRadioTab());
tabGroup.open();

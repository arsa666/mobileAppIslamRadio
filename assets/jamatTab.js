var jamatWin = Titanium.UI.createWindow({
    title:'Jamat Times/Horario',
    backgroundColor:'#fff',
    layout: 'vertical',
    exitOnClose:true
});


////////////////Jamat Times/////////////////////////////////

var tableJamat =  Titanium.UI.createTableView({});
refreshJamatTimes(tableJamat);
var refreshBtn = Titanium.UI.createButton({
    title:'Refresh',
    width:300,
    height:40
});
jamatWin.add(refreshBtn);
jamatWin.add(tableJamat);

refreshBtn.addEventListener('click', function() {
    refreshJamatTimes(tableJamat);
});


function getJamatTab() {

    var jamatTab = Titanium.UI.createTab({
        icon:'KS_nav_views.png',
        title:'Jamat Times',
        window:jamatWin
    });

    return jamatTab;
}
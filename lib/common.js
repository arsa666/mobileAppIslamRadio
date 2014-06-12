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
        return day+"/"+month+"/"+year;
    }
}
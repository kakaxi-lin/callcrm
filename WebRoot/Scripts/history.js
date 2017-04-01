var addHistory = function (num, id) {
    stringCookie = getCookie('history');
    var stringHistory = "" != stringCookie ? stringCookie : "{history:[]}";
    var json = new JSON(stringHistory);
    var e = "{num:" + num + ",id:" + id + "}";
    json['history'].push(e); //添加一个新的记录
    setCookie('history', json.toString(), 30);
}
//显示历史记录
var displayNum = 0;

var DisplayHistory = function () {
    var historyJSON = getCookie('history');
    var json = new JSON(historyJSON);
    if (displayNum >= json['history'].length) displayNum = 0; 
    $("#Text1").attr("value", json['history'][displayNum]['num']);
    displayNum++;
}

//添加cookie
var setCookie = function (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    cookieVal = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    //    alert(cookieVal);
    document.cookie = cookieVal;
}
//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            //        document.write(document.cookie.substring(c_start,c_end)+"<br>");
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
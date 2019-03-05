var cookieName = "user-data";
var expirationDays = 1;

function saveData() {
    var cookieValue = document.getElementById('data').value;


    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    cookieValue = cookieValue + "; expires=" + expirationDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue;
}

function restoreData() {
    var cookies = document.cookie.split(";");
    var result = "";
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var index = cookie.indexOf("=");
        var key = cookie.substr(0, index);
        var val = cookie.substr(index + 1);
        if (key == cookieName)
            result = val;
    }
    if (result)
        document.getElementById('result').innerText = result;
    else
        document.getElementById('result').innerText = "Nenhum dado nos cookies";
}
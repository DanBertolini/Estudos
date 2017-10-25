window.onload = function () {
    window.addEventListener('storage', respondToChange, false);
}

function saveData(index) {
    var dataName = "";
    if (index == 1) {
        dataName = "userData1";
    } else {
        dataName = "userData2";
    }

    var data = document.getElementById('data').value;
    try {
        localStorage.setItem(dataName, data);
        //localStorage[dataName] = data;
    } catch (e) {
        alert("Limit of data saved: QuotaExceededError");
    }
}

function restoreData(index) {
    var result = localStorage.getItem("userData" + index);

    if (result)
        document.getElementById('result').innerText = result;
    else
        document.getElementById('result').innerText = "Nenhum dado no local storage";
}

function clearData(index) {
    if (index !== undefined) {
        var key = localStorage.key(index - 1);
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}

function countData() {
    document.getElementById('count').innerText = localStorage.length;
}

function saveJsonData() {
    var data = document.getElementById('data').value;

    try {
        localStorage.userJsonData = data;
    } catch (e) {
        alert("Limit of data saved: QuotaExceededError");
    }
}

function restoreJsonData() {
    var data = localStorage.getItem("userJsonData");

    try {
        data = JSON.parse(data);
    } catch (e) {
        alert("Invalid JSON format")
    }

    var result = "";
    if (data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result += key + " -> " + data[key] + "<br/>";
            }
        }
        document.getElementById('result').innerHTML = result;
    }
    else
        document.getElementById('result').innerText = "Nenhum dado no local storage";
}

function respondToChange(e) {
    alert(e.newValue);
}
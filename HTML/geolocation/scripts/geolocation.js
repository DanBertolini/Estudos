var watchId = 0;
var isWatching = false;

var newLocation = null;
var oldLocation = null;
$(document).ready(function () {
    getLocation();
    $('#startMonitoring').on('click', beginWatch);
    $('#stopMonitoring').on('click', endWatch);
});
function supportsGeolocation() {
    return 'geolocation' in navigator;
}
function showMessage(message) {
    if (isWatching) {
        $('#message2').html(message);
    } else {
        $('#message').html(message);
    }
}
function getLocation() {
    if (supportsGeolocation()) {
        var options = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 20000
        };
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    }
    else {
        showMessage("Geolocation is not supported by this browser.");
    }
}

function beginWatch() {
    isWatching = true;
    if (supportsGeolocation()) {
        var options = {
            enableHighAccuracy: true
        };
        watchId = navigator.geolocation.watchPosition(showPosition, showError, options);
    }
    else {
        showMessage("Geolocation is not supported by this browser.");
    }
}
function endWatch() {
    if (watchId != 0) {
        navigator.geolocation.clearWatch(watchId);
        watchId = 0;
        showMessage("Monitoring ended.");
    }
}
function showPosition(position) {
    newLocation = position;

    var datetime = new Date(position.timestamp).toLocaleString();
    showMessage("Latitude: " + position.coords.latitude + "<br />"
        + "Longitude: " + position.coords.longitude + "<br />"
        + "Timestamp: " + datetime);

    if(newLocation && oldLocation){
        getDistance(oldLocation.coords.latitude, oldLocation.coords.longitude,
            newLocation.coords.latitude, newLocation.coords.longitude);
    }

    oldLocation = position;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessage("User denied Geolocation access request.");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Location information unavailable.");
            break;
        case error.TIMEOUT:
            showMessage("Get user location request timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("An unknown error occurred.");
            break;
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    var earthRadius = 3959; //miles
    var latRadians = getRadians(lat2 - lat1);
    var lonRadians = getRadians(lon2 - lon1);
    var a = Math.sin(latRadians / 2) * Math.sin(latRadians / 2) +
        Math.cos(getRadians(lat1)) * Math.cos(getRadians(lat2)) *
        Math.sin(lonRadians / 2) * Math.sin(lonRadians / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = earthRadius * c;
    $('#distance').html(distance);
}
function getRadians(latlongDistance) {
    return latlongDistance * Math.PI / 180;
}
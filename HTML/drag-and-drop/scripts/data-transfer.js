window.onload = function () {
    document.getElementById("carList").addEventListener("dragstart", dragging);
    document.getElementById("favoriteCars").addEventListener("dragenter", preventDefault);
    document.getElementById("favoriteCars").addEventListener("dragover", preventDefault);
    document.getElementById("favoriteCars").addEventListener("drop", dropItem);
}

function dragging(e) {
    var val = e.target.getAttribute('data-value');
    e.dataTransfer.setData('text', val);
    e.dataTransfer.effectAllowed = 'copy';
}
function preventDefault(e) {
    e.preventDefault();
}
function dropItem(e) {
    var data = event.dataTransfer.getData("Text").split(',');
    if (data[0] == 'car') {
        var li = document.createElement('li');
        li.textContent = data[1];
        e.target.appendChild(li);
    }
}
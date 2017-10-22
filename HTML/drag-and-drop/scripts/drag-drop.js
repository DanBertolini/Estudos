var $draggedItem;
$(document).ready(function () {
    $('.item').on('dragstart', dragging);
    $('.item').on('dragend', draggingEnded);
    $('.hole').on('dragenter', preventDefault);
    $('.hole').on('dragover', preventDefault);
    $('.hole').on('drop', dropItem);
});

function dragging(e) {
    $(e.target).addClass('dragging');
    $draggedItem = $(e.target);
}
function draggingEnded(e) {
    $(e.target).removeClass('dragging');
}

function preventDefault(e) {
    e.preventDefault();
}
function dropItem(e) {
    console.log(e);
    var hole = $(e.target);
    if (hole.hasClass('hole') && hole.children().length == 0) {
        $draggedItem.detach();
        $draggedItem.appendTo($(e.target));
    }
}

window.onload = function () {
    var itens = document.getElementsByClassName("item");
    for (var i = 0; i < itens.length; i++) {
        itens[i].addEventListener('dragstart', dragging, false);
        itens[i].addEventListener('dragend', draggingEnded, false);
    }

    var holes = document.getElementsByClassName("hole");
    for (var i = 0; i < holes.length; i++) {
        holes[i].addEventListener('dragenter', preventDefault, false);
        holes[i].addEventListener('dragover', preventDefault, false);
        holes[i].addEventListener('drop', dropItem, false);
    }
}
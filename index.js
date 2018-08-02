let canvas = document.getElementById('my-canvas');
let firstPositions = {
    x: 0,
    y: 0
};
let isFirstClick = true;

$(document).ready(function() {
    $('#draw-type-selected').html($('input[name=draw-type]:checked').val());

    let tab = {
        'line': { func: drawLine },
        'rect': { func: drawRectangle },
        'rect-filled': { func: drawRectangle },
        'circle': {func: drawCircle}
    };

    $("#my-canvas").on('click', function(e) {
        let pos = getMousePos(canvas, e);
        tab[$('input[name=draw-type]:checked').val()].func(pos, e, canvas);
    });

    $('input:radio[name=draw-type]').change(function(e) {
        $('#draw-type-selected').html($('input[name=draw-type]:checked').val())
        isFirstClick = true;
    });
});

function drawLine(pos, e, c) {
    let ctx = c.getContext("2d");

    if (isFirstClick === true) {
        firstPositions.x = pos.x;
        firstPositions.y = pos.y;
        isFirstClick = false;
    } else {
        ctx.strokeStyle = document.getElementById('color-picker').value;
        ctx.beginPath();
        ctx.moveTo(firstPositions.x, firstPositions.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.closePath();
        isFirstClick = true;
    }
}

function drawRectangle(pos, e, c) {
    let ctx = c.getContext("2d");

    if (isFirstClick === true) {
        firstPositions.x = pos.x;
        firstPositions.y = pos.y;
        isFirstClick = false;
    } else {
        ctx.strokeStyle = document.getElementById('color-picker').value;
        ctx.beginPath();
        ctx.rect(firstPositions.x, firstPositions.y, pos.x - firstPositions.x, pos.y - firstPositions.y);
        ctx.stroke();
        ctx.closePath();
        isFirstClick = true;
    }
}

function drawCircle(pos, e, c) {
    let ctx = c.getContext("2d");

    if (isFirstClick === true) {
        firstPositions.x = pos.x;
        firstPositions.y = pos.y;
        isFirstClick = false;
    } else {
        ctx.strokeStyle = document.getElementById('color-picker').value;
        ctx.beginPath();
        let AIX = pos.x - firstPositions.x;
        let AIY = pos.y - firstPositions.y;
        let radius = Math.sqrt(Math.pow(AIX, 2) + Math.pow(AIY, 2));
        ctx.arc(firstPositions.x, firstPositions.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        isFirstClick = true;
    }
}

// get mouse pos relative to canvas (yours is fine, this is just different)
function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
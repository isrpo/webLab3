createCanvas();

function createCanvas() {
    let parentEl = document.body;
    let can = document.createElement('canvas');
    can.id = 'can';
    can.width = 600;
    can.height = 600;
    can.style = "border: 1px solid black";
    can.innerHTML;

    parentEl.appendChild(can);

    workWithCanvas();
}

function workWithCanvas() {
    let can = document.getElementById('can');
    let ctx = can.getContext('2d');

    let xhr4 = new XMLHttpRequest();
    xhr4.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru', true);
    xhr4.send();

    let text;
    xhr4.onload = function() {
        text = xhr4.responseText;
    };

    let flag = 0;

    let xhr = new XMLHttpRequest();

    xhr.open('GET', "https://source.unsplash.com/random/300x300", true);
    xhr.send();

    xhr.onload = function () {
        let img = new Image;
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            ctx.drawImage(img, 0,0);
            flag++;
            if (flag > 3) {
                wrapText(ctx, text);
            }
        };
        img.src = xhr.responseURL;
    };

    let xhr1 = new XMLHttpRequest();
    xhr1.open('GET', "https://source.unsplash.com/random/300x301", true);
    xhr1.send();

    xhr1.onload = function () {
        let img = new Image;
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            ctx.drawImage(img, 300,0);
            flag++;
            if (flag > 3) {
                wrapText(ctx, text);
            }
        };
        img.src = xhr1.responseURL;
    };

    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', "https://source.unsplash.com/random/300x302", true);
    xhr2.send();

    xhr2.onload = function () {
        let img = new Image;
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            ctx.drawImage(img, 0,300);
            flag++;
            if (flag > 3) {
                wrapText(ctx, text);
            }

        };
        img.src = xhr2.responseURL;
    };

    let xhr3 = new XMLHttpRequest();
    xhr3.open('GET', "https://source.unsplash.com/random/300x303", true);
    xhr3.send();

    xhr3.onload = function () {
        let img = new Image;
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            ctx.drawImage(img, 300,300);
            flag++;
            if (flag > 3) {
                wrapText(ctx, text);
            }
        };
        img.src = xhr3.responseURL;
    }
}

function wrapText(context, text) {
    let maxWidth = 500;
    let lineHeight = 25;
    let marginLeft = 300;
    let marginTop = 275;
    context.font = "bold 16pt Calibri";
    context.fillStyle = "#ffffff";
    let words = text.split(" ");
    let countWords = words.length;
    let line = "";
    context.textAlign = "center";
    for (var n = 0; n < countWords; n++) {
        let testLine = line + words[n] + " ";
        let testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            context.fillText(line, marginLeft, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, marginLeft, marginTop);

    createButtonDownload();
}

function createButtonDownload() {
    let parentEl = document.body;
    let btnDiv = document.createElement('div');
    btnDiv.className = 'btnDiv';
    btnDiv.innerHTML;
    parentEl.appendChild(btnDiv);
    parentEl = document.getElementsByClassName('btnDiv')[0];
    let  btn = document.createElement('button');
    btn.id = 'btn';
    btn.setAttribute('onclick', 'downloadImg()')
    btn.innerHTML = 'Download';

    parentEl.appendChild(btn);
}


function downloadImg() {
    let imageData = document.getElementById("can").toDataURL("data:image/png;");
    let image = new Image();
    image.src = imageData;
    let link = document.createElement("a");

    link.setAttribute("href", image.src);
    link.setAttribute("download", "collage.png");
    link.innerHTML;
    document.body.appendChild(link);
    link.click();
}
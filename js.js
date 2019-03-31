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

    let xhr = new XMLHttpRequest();

    // Почему это не работает?!

    // let images = [];
    // for (var i = 0; i < 4; i++) {
    //     xhr.open('GET', "https://source.unsplash.com/random/" + (300 + i).toString() + "x" +
    //         (300 + i).toString(), false);
    //     xhr.send();
    //
    //     if (xhr.status != 200) {
    //         alert( xhr.status + ': ' + xhr.statusText );
    //     } else {
    //         let img = new Image;
    //         img.src = xhr.responseURL;
    //
    //         img.onload = function() {
    //             ctx.drawImage(img, i === 2|| i === 0 ? 0 : 300, i > 1 ? 300 : 0);
    //         }
    //     }
    // }

    xhr.open('GET', "https://source.unsplash.com/random/300x300", false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = xhr.responseURL;

        img.onload = function() {
            ctx.drawImage(img, 0,0);
        }
    }

    xhr.open('GET', "https://source.unsplash.com/random/300x301", false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = xhr.responseURL;

        img.onload = function() {
            ctx.drawImage(img, 300,0);
        }
    }

    xhr.open('GET', "https://source.unsplash.com/random/300x302", false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = xhr.responseURL;

        img.onload = function() {
            ctx.drawImage(img, 0,300);
        }
    }

    xhr.open('GET', "https://source.unsplash.com/random/300x303", false);
    xhr.send();

    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        let img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = xhr.responseURL;

        img.onload = function() {
            ctx.drawImage(img, 300,300);
        }
    }

    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru', false);
    xhr.send();

    let text = xhr.responseText;

    let maxWidth = 500;
    let lineHeight = 25;
    let marginLeft = 300;
    let marginTop = 275;
    ctx.font = "bold 16pt Calibri";
    ctx.fillStyle = "#fff";

    wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);

    function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight)
    {
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

        ctx.restore();

        createButtonDownload();
    }
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
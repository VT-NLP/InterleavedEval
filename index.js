changeSlideInterval = setInterval(()=>plusSlides(1), 10000);
changeSlideInterval2 = setTimeout(()=>setInterval(()=>plusSlides(1, false), 10000), 5000);

readTextFile("./data.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    //for (var x in data)
    console.log(data.data["0"].img_path)

    var dc = document.createElement('div');
    dc.className = "slideshow";

    for (x in data.data) {
        var child = document.createElement('div');
        child.className = "slideshow-container";
        console.log(x);
        for (y in data.data[x]) {
            console.log(y);
            var grandchild = document.createElement('div');
            grandchild.className = "mySlides fade";
            if (y == 1) {
                grandchild.style = "display:block;";
            }
            else {
                grandchild.style = "display:none;";
            }
            
            
            grandchild.innerHTML = "<br><img src=\"" + data.data[x][y].img_path + "\">" + "<br><div class=\"instruction\"><span class=\"data_label\">Instruction: </span>" + data.data[x][y].instruction + "</div>" + "<br><div class=\"output\"><span class=\"data_label\">Output: </span>" + data.data[x][y].output + "</div>";
            child.appendChild(grandchild);
        }
        dc.appendChild(child);
    }
    

    //div.innerHTML = "<img src=\"" + data.data["0"]["0"].img_path + "\" width=\"350\" height=\"350\">"
    console.log(dc);
    document.getElementById("content-block").appendChild(dc);

    document.getElementsByClassName("data_loading")[0].style = "display:none;"
});



function show_tab(id) {
    document.getElementById(id).style.display='grid';
}

function hide_tab(id) {
    document.getElementById(id).style.display='none';
}

let slideIndex = 1;
let slideIndex2 = 1;
let slideNumber = 12 // THIS WILL BE THE NUMBER OF SLIDES PER PANEL;
//showSlides(slideIndex);

// Next/previous controls
function plusSlides(n, si1=true) {
  showSlides(n, si1);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n, si1=true) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (si1) {
        slideIndex += n;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
    }
    else {
        slideIndex2 += n;
        if (n > slides.length) {slideIndex2 = 1}
        if (n < 1) {slideIndex2 = slides.length}
    }
    
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    console.log(slideIndex % slideNumber);
    slides[slideIndex2 % slideNumber].style.display = "block";
    slides[(slideIndex % slideNumber)+slideNumber].style.display = "block";
    slides[(slideIndex2 % slideNumber)+(2*slideNumber)].style.display = "block";
    //slides[(slideIndex % slideNumber)+(3*slideNumber)].style.display = "block";
    //slides[(slideIndex2 % slideNumber)+(4*slideNumber)].style.display = "block";
    // dots[slideIndex-1].className += " active";
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}



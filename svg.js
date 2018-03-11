// Context + Canvas
var svgContainer = document.getElementById("SVG");

//buttons
var clearButton = document.getElementById("clearButton");

//master variables
var elementArray = [];

var createCircle = function(e){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //decide the random motion (neither increment = 0)
    var temp = [-1,1];
    var xIncrement= temp[Math.floor(Math.random() * 2)];
    var yIncrement = temp[Math.floor(Math.random() * 2)];
    circle.setAttribute("cx", e.offsetX);
    circle.setAttribute("cy", e.offsetY);
    circle.setAttribute("r", 15);
    circle.setAttribute("fill", "black");
    circle.setAttribute("xVelocity", xIncrement);
    circle.setAttribute("yVelocity", yIncrement);
    elementArray.push(circle);
    svgContainer.appendChild(circle);
};

var bounce = function(){
    for (var i = 0; i < elementArray.length; i++){
        var circle = elementArray[i];
        var xVelocity = Number(circle.getAttribute("xVelocity"));
        var yVelocity = Number(circle.getAttribute("yVelocity"));
        
        circle.setAttribute("cx", Number(circle.getAttribute("cx")) + xVelocity);
        circle.setAttribute("cy", Number(circle.getAttribute("cy")) + yVelocity);
        var x = Number(circle.getAttribute("cx"));
        var y = Number(circle.getAttribute("cy"));
        var radius = Number(circle.getAttribute("r"));
        console.log("x " + x);
        console.log("xvelocity: " + xVelocity);
        console.log("radius: " + radius);
        console.log("radius + xVelocity " + (radius + Math.abs(xVelocity)));
        console.log(x + (radius + Math.abs(xVelocity)));
        console.log(svgContainer.getAttribute("width"));
        console.log(x + (radius + Math.abs(xVelocity)) >= svgContainer.getAttribute("width"));
        //console.log(x + (radius + Math.abs(xVelocity)) >= svgContainer.getAttribute("width"));

        //check if circle is near the edges 
        if ((x - (radius + Math.abs(xVelocity))<= 0) || (x + (radius + Math.abs(xVelocity)) >= svgContainer.getAttribute("width"))) {
            circle.setAttribute("xVelocity", -1 * xVelocity);
            circle.setAttribute("fill", "#" + Math.floor((Math.random()*16777215)).toString(16));
        }
        if ((y - (radius + Math.abs(yVelocity))<= 0) || (y + (radius + Math.abs(yVelocity))>= svgContainer.getAttribute("height"))) {
            circle.setAttribute("yVelocity", -1 * yVelocity);
            circle.setAttribute("fill", "#" + Math.floor((Math.random()*16777215)).toString(16));
        }
    }
};

var timerID = setInterval(bounce, 10);

var clear = function(){
    clearInterval(timerID);
    svgContainer.innerHTML = "";
    elementArray = [];
    timerID = setInterval(bounce, 10);
};


clearButton.addEventListener("click", clear);
svgContainer.addEventListener("click", createCircle);

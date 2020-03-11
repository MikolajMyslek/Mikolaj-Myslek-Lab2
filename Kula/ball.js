var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta; 
  var y = event.gamma; 

  
  if (x >  90) { x = 90};
  if (x < -90) { x = -90};

  
  x += 90;
  y += 90;
    
    var xd = ball.style.top;
  
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
    
    Winner();
}
function Winner() {
  var a = ball.style.top;
  var b = ball.style.left;
  if (a <= "28px" && a >= "20px" && b <= "28px" && b >= "20px") {
    Win= "Dobra Robota";
      document.getElementById('stopTimer').innerHTML = new Date();
  } else {
    Win = "próbuj dalej";
  }
  document.getElementById("wygrana").innerHTML = Win;
}
window.addEventListener('deviceorientation', handleOrientation);
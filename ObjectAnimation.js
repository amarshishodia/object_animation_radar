// Get the canvas element
var canvas = document.getElementById("myCanvas");

// Set the canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the context of the canvas
var ctx = canvas.getContext("2d");

// Load the image
var img = new Image();
img.src = "image.png";

// Initialize variables for target position and distance
var targetX = 0;
var targetY = 0;
var targetDistance = 0;

// Define a function to update the target position based on the JSON data
function updateTarget(data) {
  targetX = data.TarDisLong;
  targetY = data.TarDisLat;
  targetDistance = data.TargetDistance;
}

// Define a function to draw the image and target on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  // Draw the target
  ctx.beginPath();
  ctx.arc(targetX, targetY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  
  // Draw the target distance text
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Target distance: " + targetDistance, 10, 50);
}

// Define a function to animate the image and target
function animate() {
  // Call the draw function
  draw();
  
  // Request an animation frame to run the animate function again
  requestAnimationFrame(animate);
}

// Call the animate function to start the animation
animate();

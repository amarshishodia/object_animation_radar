// Get a reference to the object element
const object = document.getElementById('object');

// Define the starting position of the object
let position = {
  x: 0,
  y: 0
};

// Define the JSON data
const data = [
  { x: 25, y: 9 },
  { x: 26, y: 10 },
  { x: 26, y: 11 },
  { x: 27, y: 11 },
  { x: 25, y: 10 },
  { x: 28, y: 12 },
  { x: 28, y: 11 },
  { x: 29, y: 12 },
  { x: 30, y: 13 },
  { x: 30, y: 14 },
  { x: 31, y: 14 },
  { x: 32, y: 15 },
  { x: 32, y: 15 }
];

// Define the current index in the data array
let index = 0;

// Define the update function
function update() {
  // Get the current data point
  const currentData = data[index];
  
  // Update the position based on the data
  position.x = currentData.x;
  position.y = currentData.y;
  
  // Update the position of the object element
  object.style.left = `${position.x}px`;
  object.style.top = `${position.y}px`;
  
  // Increment the index
  index++;
  
  // If we've reached the end of the data array, reset the index to 0
  if (index >= data.length) {
    index = 0;
  }
  
  // Schedule the next update
  setTimeout(update, 100);
}

// Start the update loop
update();

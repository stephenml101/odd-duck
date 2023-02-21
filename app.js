'use strict';

// ********** GLOBAL VARIABLES **********

let oddProductArray = [];
let votingRounds = 25;

// ********** WINDOW TO THAT DOM **********

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// ********** CONSTRUCTOR FUNCTIONS **********
function Odd(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

// ********** HELPER FUNCTIONS/UTILITIES **********

function renderImg() {
  // TODO: 3 images 
  let imgOneIndex = getRandomIndex();
  let imgTwoIndex = getRandomIndex();
  let imgThreeIndex = getRandomIndex();

  // TODO: Make sure that the images do not repeat
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = getRandomIndex();
    imgThreeIndex = getRandomIndex();
  }

  imgOne.src = oddProductArray[imgOneIndex].image;
  imgOne.title = oddProductArray[imgOneIndex].image;
  imgOne.alt = `this is an image of ${oddProductArray[imgOneIndex].name}`;
  imgTwo.src = oddProductArray[imgTwoIndex].image;
  imgTwo.title = oddProductArray[imgTwoIndex].image;
  imgTwo.alt = `this is an image of ${oddProductArray[imgTwoIndex].name}`;
  imgThree.src = oddProductArray[imgThreeIndex].image;
  imgThree.title = oddProductArray[imgThreeIndex].image;
  imgThree.alt = `this is an image of ${oddProductArray[imgThreeIndex].name}`;

  // TODO: Increase the number of views
  oddProductArray[imgOneIndex].views++;
  oddProductArray[imgTwoIndex].views++;
  oddProductArray[imgThreeIndex].views++;
}

function getRandomIndex() {
  return Math.floor(Math.random() * oddProductArray.length);
}

function handleImageClick(event){
  // TODO: Identify which image was clicked
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  // TODO: Increase the number of clicks on the image
  for (let i = 0; i < oddProductArray.length; i++) {
    if (imgClicked === oddProductArray[i].image) {
      oddProductArray[i].votes++;
    }

  }

  // TODO: Decrease the number of voting rounds
  votingRounds--;

  // TODO: Rerender the images
  renderImg();

  // TODO: Once voting is complete, stop the click event from bubbling up
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImageClick);
  }
}

function handleShowResults(){
  if (votingRounds === 0){
    for (let i = 0; i < oddProductArray.length; i++){
      let prodListItem = document.createElement('li');
      prodListItem.textContent = `${oddProductArray[i].name}: Views: ${oddProductArray[i].views} & Votes: ${oddProductArray[i].votes}`;
      resultsList.appendChild(prodListItem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ********** EXECUTABLE CODE **********
let bag = new Odd('bag');
let banana = new Odd('banana');
let bathroom = new Odd('bathroom');
let boots = new Odd('boots');
let breakfast = new Odd('breakfast');
let bubblegum = new Odd('bubblegum');
let chair = new Odd('chair');
let cthulhu = new Odd('cthulhu');
let dogDuck = new Odd('dog-duck');
let dragon = new Odd('dragon');
let pen = new Odd('pen');
let petSweep = new Odd('pet-sweep');
let scissors = new Odd('scissors');
let shark = new Odd('shark');
let sweep = new Odd('sweep', 'png');
let tauntaun = new Odd('tauntaun');
let unicorn = new Odd('unicorn');
let waterCan = new Odd('water-can');
let wineGlass = new Odd('wine-glass');

oddProductArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
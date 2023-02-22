'use strict';
console.log('hello world');

// ********** GLOBAL VARIABLES **********

let oddProductArray = [];
let votingRounds = 25;
let indexArray = [];

// ********** WINDOWS INTO THAT DOM **********

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
//let resultsList = document.getElementById('results-container');

// ********** CANVAS ELEMENT FOR CHART **********
let ctx = document.getElementById('my-chart');

// ********** CONSTRUCTOR FUNCTIONS **********
function Odd(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

// ********** CHART RENDERING **********
function renderChart() {
  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < oddProductArray.length; i++) {
    prodNames.push(oddProductArray[i].name);
    prodVotes.push(oddProductArray[i].votes);
    prodViews.push(oddProductArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Views',
        data: prodViews,
        borderWidth: 5,
        backgroundColor: ['blue'],
        borderColor: ['orange']
      },
      {
        label: '# of Votes',
        data: prodVotes,
        borderWidth: 5,
        backgroundColor: ['orange'],
        borderColor: ['blue']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  // render chart - 2 arguments for chart constructor (canvas element, config object w/data)
  new Chart(ctx, chartObj); //eslint-disable-line
}

// ********** HELPER FUNCTIONS/UTILITIES **********

function renderImg() {

  while (indexArray.length < 6) {
    let randomNum = getRandomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }
  console.log(indexArray);

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  // mapping
  imgOne.src = oddProductArray[imgOneIndex].image;
  imgOne.title = oddProductArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${oddProductArray[imgOneIndex].name}`;
  imgTwo.src = oddProductArray[imgTwoIndex].image;
  imgTwo.title = oddProductArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${oddProductArray[imgTwoIndex].name}`;
  imgThree.src = oddProductArray[imgThreeIndex].image;
  imgThree.title = oddProductArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${oddProductArray[imgThreeIndex].name}`;

  // TODO: Increase the number of views
  oddProductArray[imgOneIndex].views++;
  oddProductArray[imgTwoIndex].views++;
  oddProductArray[imgThreeIndex].views++;
}
// gets a random image from the prod array by index number
function getRandomIndex() {
  return Math.floor(Math.random() * oddProductArray.length);
}

// ********** EVENT HANDLERS **********

function handleImageClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked); //print the title of the clicked image in console
  // TODO: Increase the number of clicks on the image
  for (let i = 0; i < oddProductArray.length; i++) {
    if (imgClicked === oddProductArray[i].name) {
      oddProductArray[i].votes++;
      votingRounds--;
      renderImg();
    }
  }

  // TODO: Once voting is complete, stop the click event 
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImageClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    resultsBtn.removeEventListener('click', handleShowResults);
    renderChart();
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
'use strict';
console.log('hello world');

// ********** GLOBAL VARIABLES **********

let prodArray = [];
let votingRounds = 25;
let indexArray = [];

// ********** DOM WINDOWS **********

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
//let resultsList = document.getElementById('results-container');

// ********** CANVAS ELEMENT FOR CHART **********
let ctx = document.getElementById('my-chart');

// ********** CONSTRUCTOR FUNCTIONS **********
function Product(name, fileExtension = 'jpg') {
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

  for (let i = 0; i < prodArray.length; i++) {
    prodNames.push(prodArray[i].name);
    prodVotes.push(prodArray[i].votes);
    prodViews.push(prodArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Views',
        data: prodViews,
        borderWidth: 2,
        backgroundColor: ['black'],
        borderColor: ['pink']
      },
      {
        label: '# of Votes',
        data: prodVotes,
        borderWidth: 2,
        backgroundColor: ['pink'],
        borderColor: ['black']
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
  imgOne.src = prodArray[imgOneIndex].image;
  imgOne.title = prodArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${prodArray[imgOneIndex].name}`;
  imgTwo.src = prodArray[imgTwoIndex].image;
  imgTwo.title = prodArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${prodArray[imgTwoIndex].name}`;
  imgThree.src = prodArray[imgThreeIndex].image;
  imgThree.title = prodArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${prodArray[imgThreeIndex].name}`;

  // TODO: Increase the number of views
  prodArray[imgOneIndex].views++;
  prodArray[imgTwoIndex].views++;
  prodArray[imgThreeIndex].views++;
}
// gets a random image from the prod array by index number
function getRandomIndex() {
  return Math.floor(Math.random() * prodArray.length);
}

// ********** EVENT HANDLERS **********

function handleImageClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked); //print the title of the clicked image in console
  // TODO: Increase the number of clicks on the image
  for (let i = 0; i < prodArray.length; i++) {
    if (imgClicked === prodArray[i].name) {
      prodArray[i].votes++;
      votingRounds--;
      renderImg();
    }
  }

  // TODO: Once voting is complete, stop the click event from bubbling up
  // ********** LOCAL STORAGE STARTS HERE **********
  // TODO: Convert our data to a string and store it in local storage
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImageClick);
    let stringifiedProducts = JSON.stringify(prodArray);
    console.log('stringified product list >>>', stringifiedProducts);

    // TODO: Set stringifiedProducts to local storage
    localStorage.setItem('prodArray', stringifiedProducts);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    resultsBtn.removeEventListener('click', handleShowResults);
    renderChart();
  }
}



// ********** EXECUTABLE CODE **********

// ********** Local Storage Continues Here **********
// TODO: Get the stringifiedProducts from local storage
let retrievedProducts = localStorage.getItem('prodArray');
console.log('Product List from Local Storage >>>', retrievedProducts);
// TODO: Convert back to usable code
let parsedProducts = JSON.parse(retrievedProducts);
console.log('My Parsed Product List >>>', parsedProducts);

// ********** REBUILD PRODUCT ARRAY USING CONSTRUCTOR **********
if (retrievedProducts) {
  for (let i = 0; i < parsedProducts.length; i++) {
    if (parsedProducts[i].name === 'sweep') {
      let reconstructedSweep = new Product(parsedProducts[i].name, 'png');
      reconstructedSweep.views = parsedProducts[i].views;
      reconstructedSweep.votes = parsedProducts[i].votes;
      prodArray.push(reconstructedSweep);
    } else {
      let reconstructedProd = new Product(parsedProducts[i].name);
      reconstructedProd.views = parsedProducts[i].views;
      reconstructedProd.votes = parsedProducts[i].votes;
      prodArray.push(reconstructedProd);
    }
  }
}
else {
  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petSweep = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('water-can');
  let wineGlass = new Product('wine-glass');

  prodArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}


renderImg();

imgContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
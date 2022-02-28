//const prompt = require('prompt-sync') (); 


const ussShip = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7
}

const alienShips = [];
let randomNumOfAlienShips = Math.floor(Math.random()*11)+5;
console.log(randomNumOfAlienShips);
console.log(alienShips);
for (let i=0; i<randomNumOfAlienShips; i++) {
    const alienShip = {
        hull: Math.floor(Math.random()*4)+3,
        firepower: Math.floor(Math.random()*3) + 2,
        accuracy: Math.round((Math.random()*2.1) +6.0) /10,
        alienShipNumber: i+1
    }
    alienShips.push(alienShip);
    let stringOfShips = JSON.stringify(alienShip);
    $('#num-of-aliens').append(`<p id="alien-${i+1}">${stringOfShips}</p>`);

}

let currentAlienShip = alienShips[0];


// check if user is able to win
const userWins = () => {
    if (alienShips.length == 0) {
        userWinsStatus = true;
        $('.retreat-page').css('display', 'none');
        $('.attack-page').css('display', 'none');
        $('.beginning-page').css('display', 'none');
        $('.computer-turn-page').css('display', 'none');
        $('.user-wins-page').append(`<p>Congrats! You beat all the alien ships! \nGAMEOVER</p>`);
        $('.user-wins-page').css('display','block');
        setTimeout( ()=>{
            location.reload();
        }, 5000);
    }
}

// check if user loses 
const userLoses = () => {
    if (ussShip.hull <= 0) {
        userLosesStatus = true;
        $('.retreat-page').css('display', 'none');
        $('.attack-page').css('display', 'none');
        $('.beginning-page').css('display', 'none');
        $('.computer-turn-page').css('display', 'none');
        $('.user-loses-page').append(`<p>Unfortunately, the alien ships were able to completely demolish your ship. You lost! \nGAME OVER</p>`);
        $('.user-loses-page').css('display','block');
        setTimeout( ()=>{
            location.reload();
        }, 5000);
    }
}


const alienTurn = () => {
    console.log(alienShips);
    console.log(currentAlienShip);
    // is the attack successful?
    if (Math.random() <= currentAlienShip.accuracy) {
        $('.computer-turn-page').append(`<p class="results">The alien ship's lasers were successful at attacking your ship!</p>`);
        ussShip.hull -= currentAlienShip.firepower;
        // reset user stats
        $('#beginning-stats').remove();
        let ussShipString = JSON.stringify(ussShip);
        console.log('string of ussSHips' +ussShipString);
        $('.user-stats').append('<p id="beginning-stats">'+ussShipString+'</p>');
        // is the uss ship still alive after the attack?
        if (ussShip.hull <= 0) {
            console.log(ussShip);
            userLoses();
        } else if (ussShip.hull > 0) {
            $('.computer-turn-page').append(`<p class="results">Thank goodness! Your ship was luckily not destroyed! But unfortunately, it was compromised. Below are your amount of hitpoints left: </p>`);
            $('.computer-turn-page').append(`<p class="results">${ussShip.hull}</p>`);
            $('.computer-turn-page').append(`<p class="results">It is now your turn!</p>`);
            let nextBtn = $('.computer-turn-page').append('<button class="next-btn">Next</button>');
            nextBtn.on('click', ()=>{
                createAttackPage();
                currentPlayerTurn = 'player';
            });
        }
    } else {
        $('.computer-turn-page').append('<p class="results">Yay! The alien ship was unsuccessful at lasering you! You were not damaged this turn. It is now your turn.</p>');
        let nextBtn = $('.computer-turn-page').append('<button class="next-btn">Next</button>');
        nextBtn.on('click', ()=>{
            createAttackPage();
            currentPlayerTurn = 'player';
        });
    }
}


// create alien page function
const createAlienPage = () => {
    $('.retreat-page').css('display', 'none');
    $('.attack-page').css('display', 'none');
    $('.computer-turn-page').css('display', 'block');
    alienTurn();
}

// create retreat function if they have just defeated a ship
const retreat = () => {
    console.log('in retreat function');
    // get value from input
    let retreatDecision = document.querySelector('#retreat').value;
    console.log(retreatDecision);
    if (retreatDecision == 'yes') {
        location.reload();
    } else if (retreatDecision == 'no') {
        // set the computer turn to block and retreat page to none prompt(`Enter [next] to continue`);
        console.log('you entered no');
        createAlienPage();
    }
}


// loop through alien ships and reset their ship number
const updateShipNum = () => {
    for (let i=0; i<alienShips.length; i++) {
        alienShips.alienShipNumber = i+1;
    }
}

// create retreat page function
$('.submit-retreat').on('click', ()=>{
    retreat();
});

const createRetreatPage = () => {
    // set display of attack to none and display of retreat to block
    $('.attack-page').css('display', 'none');
    $('.results, .next').remove();
    $('.retreat-page').css('display', 'block');
}


const getAlienValue = () => {
    // get value from input
    let pickedAlienShip = document.querySelector('#alien-ship-num').value;
    console.log(`the picked alien ship this round is ${pickedAlienShip}`);
    return pickedAlienShip;
}



$('.submit').on('click', ()=>{
    event.preventDefault();
    console.log('clicked submit button true');
    ussMakeAnAttack(getAlienValue());
});

// create attack page function
const createAttackPage = () => {
    $('.beginning-page').css('display', 'none');
    $('.computer-turn-page').css('display', 'none');
    $('.results, .next, .next-btn').remove();
    console.log('just removed results and btn and inside the create attack page');
    $('#alien-ship-num').val('');
    $('.attack-page').css('display', 'block');
    //clickSubmitBtn();
}


// Make a move
const ussMakeAnAttack = (pickedAlienShip) => {
    //updateShipNum();

    // make picked alien ship value from input a number
    let pickAlienShipNum = parseInt(pickedAlienShip);
    console.log('here is picked alien ship number '+pickAlienShipNum);
    // convert picked alien ship to index of alien ships array
    // find the array index of picked alien ship
    let alienShipIndex;
    for (let i=0; i<alienShips.length; i++) {
        if (alienShips[i].alienShipNumber == pickAlienShipNum) {
            alienShipIndex = i;
            console.log('alien ship index is '+alienShipIndex+'and the picked alien ship is'+pickAlienShipNum);
        }
    }





    // let alienShipIndex = pickAlienShipNum - 1;
    //console.log('alien ship index is '+alienShipIndex);
    currentAlienShip = alienShips[alienShipIndex];
    //console.log('here is the current alien ship'+alienShipIndex);
    // is the attack on the alien ship successful? let the player know in html
    if (Math.random() <= ussShip.accuracy) {
        $('.attack-page').append('<p class="results">Congrats, you have successfully lasered the alien ship.</p>')
        currentAlienShip.hull -= ussShip.firepower;
        $('.attack-page').append(`<p class="results">Here is the current alien's ship hull after the attack: ${currentAlienShip.hull}</p>`);
        //is the alien ship you just attacked still alive or has it been destroyed?
        if (currentAlienShip.hull <= 0) {
            $('.attack-page').append(`<p class="results">Congrats! You have successfully destroyed this alien ship! Now it is the alien's next ship's turn to attack<p>`);
            //display number of alien ships yet to destroy
            alienShips.splice(alienShipIndex, 1);
            $('#num-of-aliens #alien-'+pickAlienShipNum+'').remove();
            // see if user has destroyed all alien ships
            userWins();
            $('.attack-page').append(`<p class="results">You have ${alienShips.length} alien ships to destroy left.</p>`);
            $('.attack-page').append('<button class="next">Next</button>')
            $('.next').on('click', ()=>{
                createRetreatPage();
                // set currentPlayerTurn to alien
                //currentPlayerTurn = 'alien';
            })
            
        } else if (currentAlienShip.hull > 0) {
            $('.attack-page').append(`<p class="results">You were unsuccessful at destroying this alien ship. But you were able to damage it. It is now the alien's turn to attack.</p>`);
            //display number of alien ships yet to destroy
            $('.attack-page').append(`<p class="results">You have ${alienShips.length} alien ships to destroy left.</p>`);
            $('.attack-page').append('<button class="next">Next</button>')
            $('.next').on('click', ()=>{
                // set display of attack to none and display of retreat to block
                createAlienPage();
            });
            // set currentPlayerTurn to alien
            currentPlayerTurn = 'alien';
        }
    } else {
        $('.attack-page').append('<p class="results">Sorry but your laser was unsuccessful at hitting the alien ship. It is now the aliens turn.</p>');
        $('.attack-page').append('<button class="next">Next</button>')
        $('.next').on('click', ()=>{
            // set display of attack to none and display of retreat to block
            createAlienPage();
        });
        // set currentPlayerTurn to alien
        currentPlayerTurn = 'alien';
    }
}








// event listener for starting game button
const startBtnClick = () => {
    $('.first-btn').on("click", ()=>{
        event.preventDefault();
        createAttackPage();
    })
}

const createStartScreen = () => {
    // print to beginning screen the starting stats to the beginning stats div
    let ussShipString = JSON.stringify(ussShip);
    $('#beginning-stats').text(ussShipString);
    startBtnClick();
}

createStartScreen();




// // add current player turn 
// let currentPlayerTurn;
// // create while loop to loop through turns
// let userWinsStatus = false;
// let userLosesStatus = false;
// while (userLosesStatus == false && userWinsStatus == false) {
//     // print to beginning screen the starting stats to the beginning stats div
//     let ussShipString = JSON.stringify(ussShip);
//     $('#beginning-stats').text(ussShipString);

//     if (currentPlayerTurn == null) {
//         console.log("currentPlayerTurn is null and is running this part");
//         startBtnClick();
//         clickSubmitBtn();
//         if (submitBtnClicked == true) {
//             console.log("the submit")
//             submitBtnClicked = false;
//             ussMakeAnAttack(getAlienValue());
//         }
//     } else if (currentPlayerTurn == 'alien') {
//         console.log("currentPlayerTurn is alien");
//         alienTurn();
//     } else if (currentPlayerTurn == 'player') {
//         console.log("currentPlayerTurn is player");
//         // reset input value
//         $('#alien-ship-num').val('');
//         submitBtnClicked = false;
//         clickSubmitBtn();
//         getAlienValue();
//         if (submitBtnClicked == true) {
//             ussMakeAnAttack(getAlienValue());
//         }
//     }
// }




// $('.submit').on("click", ()=>{
//     event.preventDefault();
//     ussMakeAnAttack(getAlienValue());
//     console.log('hello');
// });

// // click submit for retreat question
// $('.submit-retreat').on("click", ()=>{
//     event.preventDefault();
//     retreat();
//     console.log('hello');
// });





//prompt(`To begin destroying the horde of aliens enter [b] to begin`);
//firstMove();




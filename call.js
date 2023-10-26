let currentPokemonName = ""; // Track the name of the current Pokemon
let points = 0; // Assign the start point value as 0
let totalHints = 1; // Assign the totalHints used as 0
let revealed = [] // Assign the empty list where it'll be used later on to add individual letters of the pokemon per hint 


// Making the button functional and returning a function back
document.getElementById("press").addEventListener("click", guessPokemon, true); 
document.getElementById("reset").addEventListener("click", randomPokemon, true);
document.getElementById("hint").addEventListener("click", hint, true);

// Function to generate a random Pokémon
function randomPokemon() {
    let min = 1; // Minimum Pokémon number
    let max = 899; // Maximum Pokémon number
    let randomPokemonNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random Pokémon number
    
    let url = "https://pokeapi.co/api/v2/pokemon/" + randomPokemonNumber; // Construct the URL
    apiRequest(url); // Send the url result so that the function "apiRequest" can use it

    revealed = [] // Reset the list
    totalHints = 1 // Reset totalHints
    
    document.getElementById("revealed").innerHTML = "" // Reset the hinted letters
    document.getElementById("guess").value = ""  // Reset the guessig input text
}

// Function to make an API request to retrieve Pokémon data
function apiRequest(url) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        // If response code is 200 and the client state is equal to 4
        if (this.readyState == 4 && this.status == 200) {
            let responseData = httpRequest.responseText; // Get the response text
            let parsedData = JSON.parse(responseData); // Parsing it into a JSON dict
            let pokemonName = parsedData.name; // Res into the keys to get the pokemon name key

            // Access the sprites array and get the front_default image URL and then update it
            let spriteModel = parsedData.sprites.other.home.front_default;
            document.getElementById("image").src = spriteModel;

            // Store the name of the current Pokemon
            currentPokemonName = pokemonName;
            console.log(pokemonName);
        }
    };


    // Make the API request through GET-request
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

// Function to handle the player's guess
function guessPokemon() {
    let displayText = document.getElementById("response");
    let guess = document.getElementById('guess').value;

    // If a guess is empty, do not continue with anything, but rather return
    if(guess === ""){
        return
    }

    // If the guess is correct, add +1 point to the currentPoints
    if (guess.toLowerCase() === currentPokemonName.toLowerCase()) {
        // Display to the user that their answer was correct.
        displayText.innerHTML = ("Correct! You guessed the Pokemon!");
        displayText.style.color = "green";

        // Add points per corrected guess
        points += 3;

        // Deduct points if the user have used more hints
        if(totalHints <= 3){
            points -= 2
        }

        // Refresh the HTML text for id, points and revealed.
        document.getElementById("points").innerHTML = "Current points: " + points;
        document.getElementById("revealed").innerHTML = ""

        // Reset the current stats
        revealed = []
        totalHints = 1

        // Generate a new random Pokémon for the next round
        randomPokemon(); 

        // Set a timeout to clear the message after 5 seconds
        setTimeout(function () {displayText.innerHTML = "";}, 5000);
        document.getElementById("guess").value = "" 
        
    } else {
        // Display to the user that their answer was wrong.
        displayText.innerHTML = ("Wrong! Guess again!");
        displayText.style.color = "red";

        // Set a timeout to clear the message after 5 seconds
        setTimeout(function () {displayText.innerHTML = "";}, 5000);
        document.getElementById("guess").value = "" 
    }
}

// Function to provide a hint
function hint() {
    if (points > 0){
        totalHints += 1
        points -= 1
        
        // If totalHints is greater or equal to the total length of the current pokemon
        if(totalHints >= currentPokemonName.length + 2){
            alert("There's no more letters to reveal!")
            return
        }
    
        // Insert the new hint in the list, and show the deducted points in the HTML page
        revealed.push(currentPokemonName.toUpperCase()[totalHints - 2])
        document.getElementById("revealed").innerHTML = revealed.join("")
        document.getElementById("points").innerHTML = "Current points: " + points;

    // Display an error message indicating that the user has no more points to use
    }else{
        alert("Insufficent amount of points to spend!")
        return
    }
}   

// Start the game by generating the first random Pokémon.
randomPokemon();

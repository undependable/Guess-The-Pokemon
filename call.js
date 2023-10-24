var currentPokemonName = ""; // Track the name of the current Pokemon
var points = 0;

document.getElementById("press").addEventListener("click", guessPokemon, true);
document.getElementById("reset").addEventListener("click", randomPokemon, true);
document.getElementById("hint").addEventListener("click", hint, true);

function randomPokemon() {
    var min = 1; // Minimum Pokémon number
    var max = 800; // Maximum Pokémon number
    var randomPokemonNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random Pokémon number
    var url = "https://pokeapi.co/api/v2/pokemon/" + randomPokemonNumber; // Construct the URL
    apiRequest(url);
}

function apiRequest(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = xhttp.responseText;
            var parsedData = JSON.parse(responseData);
            var pokemonName = parsedData.name;

            // Access the sprites array and get the front_default image URL and then update it
            var spriteModel = parsedData.sprites.other.home.front_default;
            document.getElementById("image").src = spriteModel;

            // Store the name of the current Pokemon
            currentPokemonName = pokemonName;
            console.log(pokemonName)
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

function guessPokemon() {
    var displayText = document.getElementById("response");
    var guess = document.getElementById('guess').value;

    if (guess.toLowerCase() === currentPokemonName.toLowerCase()) {
        displayText.innerHTML = ("Correct! You guessed the Pokemon!");
        displayText.style.color = "green";

        points += 1;
        document.getElementById("points").innerHTML = "Current points: " + points;

        // Set a timeout to clear the message after 5 seconds
        setTimeout(function () {
            displayText.innerHTML = "";
        }, 5000);

        randomPokemon();
    
    }else {
        displayText.innerHTML = ("Wrong! Guess again!");
        displayText.style.color = "red";

        // Set a timeout to clear the message after 5 seconds
        setTimeout(function () {
            displayText.innerHTML = "";
        }, 5000);
    }
}

function hint(){
    alert("Starts with an, "+ currentPokemonName.toUpperCase()[0]) 
}

// Start the game by generating the first random Pokemon.
randomPokemon();
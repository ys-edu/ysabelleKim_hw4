displayPKMN();

// helper function to display types since some Pokémon can have 2
function displayTypes(typesData) {
    for (let i = 0; i < typesData.length; i++) {
        let type = typesData[i];
        // converts JSON to string, then removes quotes and capitalizes it
        let strType = JSON.stringify(type['type']['name'])
        strType = strType.replace(/^"(.*)"$/, '$1');
        strType = strType.charAt(0).toUpperCase() + strType.slice(1);
        // if there are two types, add a colon and space in between
        if (i > 0) {
            document.querySelector("#pkmnTypes").innerHTML += ", "+strType;
        }
        else {
            document.querySelector("#pkmnTypes").innerHTML += strType;
        }
    }
}

// displayPKMN() fetches data from web API and displays information after user enters a valid number
async function displayPKMN() {
    // display pkmnBlock info and resets types and img display
    document.querySelector("#pkmnTypes").innerHTML = "";
    document.querySelector("#pkmnSprite").className = "";
    let url = `https://pokeapi.co/api/v2/pokemon/snom/`;
    let response = await fetch(url);
    let data = await response.json();
    let pkmnSpriteImg = document.querySelector("#pkmnSprite");
    pkmnSpriteImg.src = data.sprites.front_default;
    document.querySelector("#pkmnSprite").className = "animate__animated animate__bounce";
    document.querySelector("#pkmnNum").innerHTML = data.id;
    let pkmnName = data.name;
    document.querySelector("#pkmnName").innerHTML = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);
    displayTypes(data.types);
}
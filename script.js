const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
	form.addEventListener("submit", async () => {
        event.preventDefault();
        // Get input values
		const formData = new FormData(form);
		const pokemonDataUrl = apiBaseUrl + formData.get("pokemon-name").toLocaleLowerCase();
		// Make a get request to the API
        const response = await fetch(pokemonDataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
            const data = await response.json();
            const pokemonPhotoDataUrl = data["forms"][0]["url"];
            const pokemonPhotoResponse = await fetch(pokemonPhotoDataUrl);
            if (!pokemonPhotoResponse.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                const pokemonPhotoData = await pokemonPhotoResponse.json();
                const pokemonPhoto = pokemonPhotoData["sprites"]["front_default"];
                document.querySelector(".screen").innerHTML = `<img src="${pokemonPhoto}" alt="Pokemon Image" class="pokemon-image">`;
            }
        }
	});

	// Manage response
});

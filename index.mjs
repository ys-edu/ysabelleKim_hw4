// imports Express library
import express from 'express';
import fetch from 'node-fetch';
import { PokemonClient } from 'pokenode-ts';
const quote = (await import('inspirational-quotes')).default;
// variable 'app' to access the methods
const app = express();
// using EJS as our current templating language
app.set("view engine", "ejs");
// specify folder for static files (images, css, etc.)
app.use(express.static("public"));
let pkmnTypes = "";
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
			pkmnTypes += ", "+strType;
		}
		else {
			pkmnTypes += strType;
		}
	}
}

// root route
app.get('/', async(req, res) => {
	let quoteText = quote.getQuote({author: false});
	res.render('index', {quoteText});
});
app.get('/pkmn', async(req, res) => {
	// variable to access the methods
	const pokeApi = new PokemonClient();
	let pkmnInfo;
	// stores data in pkmnInfo
	await pokeApi
		.getPokemonByName('snom')
		.then((data) => pkmnInfo = data)
		.catch((e) => console.error(e));
	displayTypes(pkmnInfo.types);
	res.render('pkmn', {pkmnTypes, pkmnInfo});
});
app.get('/courses', async(req, res) => {
	res.render('courses');
})
app.get('/art', async(req, res) => {
	res.render('art');
})
app.get('/isopods', async(req, res) => {
	res.render('isopods');
})
// start server using port 3000
app.listen(3000, () => {
	console.log('server started');
});

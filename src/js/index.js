// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
	artists
} from "./numbers.js"
import {
	api
} from "./env.js";

const optionsDeezer = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${api.deezer}`,
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
const urlArtist = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artists.käptnPeng.number}`


const getData = async (url, options) => {
	let response = await fetch(url, options);
	console.log(response);
	let data = await response.json();
	console.log(data);
};
console.log(artists);
getData(urlArtist, optionsDeezer);
// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
	artists,
	playlists
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

// Object.values(playlists).forEach(list => {
// 	console.log(list.number)
// });

const urlArtist = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artists.käptnPeng.number}`
const urlPlaylist = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlists.popRock.number}`


const getData = async (url, options) => {
	let response = await fetch(url, options);
	console.log(response);
	let data = await response.json();
	console.log(data);
	Object.values(data).forEach((list) => {
		document.querySelector('h4').innerText = data.title;
	})

};
console.log(artists);
getData(urlArtist, optionsDeezer);
getData(urlPlaylist, optionsDeezer);
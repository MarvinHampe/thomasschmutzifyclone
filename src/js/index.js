// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
	artists,
	playlists
} from "./numbers.js"
import {
	api
} from "./env.js";

// OPTIONS for APIs
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${api.deezer}`,
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};


//URLs für DEEZER API
const url = `https://deezerdevs-deezer.p.rapidapi.com/`


// Object.values(playlists).forEach(list => {
// 	console.log(list.number)
// });


//FETCH FUNKTION
const getData = async (endpoint) => {

    let response = await fetch(url+endpoint,options);
    console.log(response);
    let data = await response.json();
    console.log(data);
	return data;
};


// DOM connection

let startPlaylist = document.getElementById('playlistsStart');
let startArtist = document.getElementById('artistStart');



//ONLOAD

window.onload = () => {

	playlists.map(async (playlist) =>{
		const data = await getData(`playlist/${playlist.number}`);
		console.log(data);

		startPlaylist.innerHTML += `
		<div class="list">
		<div class="item">
		  <img src="${data.picture_big}" />
		  <div class="play">
			<span class="fa fa-play"></span>
		  </div>
		  <h4>${data.title}</h4>
		  <p>${data.description}</p>
		</div>`;
	})
	
	artists.map(async (artist) =>{
		const data = await getData(`artist/${artist.number}`);
		console.log(data);

		startArtist.innerHTML += `
		<div class="list">
		<div class="item">
		  <img src="${data.picture_big}" />
		  <div class="play">
			<span class="fa fa-play"></span>
		  </div>
		  <h4>${data.name}</h4>
		  <p>${data.type}</p>
		</div>`;
	})
};

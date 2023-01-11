// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
	artists,
	playlists
} from "./numbers.js"
import {
	api
} from "./env.js";

// OPTIONS for APIs
const optionsDeezer = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${api.deezer}`,
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};


//URLs für DEEZER API
const urlArtist = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artists.käptnPeng.number}`
const urlPlaylist = `https://deezerdevs-deezer.p.rapidapi.com/playlist/8074581462`

// Object.values(playlists).forEach(list => {
// 	console.log(list.number)
// });

const urlArtist = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artists.käptnPeng.number}`
const urlPlaylist = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlists.popRock.number}`


//FETCH FUNKTION
const getData = async (url, options) => {

    let response = await fetch(url,options);
    console.log(response);
    let data = await response.json();
    console.log(data);
	return data;
};


// DOM connection

let startPlaylist = document.getElementById('playlistsStart');


//ONLOAD

window.onload = () => {
	
	startPlaylist.innerHtml = `
	<div class="list">
	<div class="item">
	  <img src="/img/among_us_cover.jpg" />
	  <div class="play">
		<span class="fa fa-play"></span>
	  </div>
	  <h4>Today's Top Hits</h4>
	  <p>Rema & Selena Gomez are on top of the...</p>
	</div>`;
};

// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
	artists,
	playlists,
	albums
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

	let response = await fetch(url + endpoint, options);
	console.log(response);
	let data = await response.json();
	console.log(data);
	return data;
};


// DOM connection

let startPlaylist = document.getElementById('playlistsStart');
let startArtist = document.getElementById('artistStart');
let startPodcast = document.getElementById('podcastStart');
let mainContainer = document.getElementById('main-container');



//ONLOAD

window.onload = () => {

	playlists.map(async (playlist) => {
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

		document.querySelector('.fa-play').addEventListener('click', () => {
			console.log("hi");



			mainContainer.innerHTML = `
			<div class="container">
				<div class="header">

					<div class="image_container">
						<img src="${data.picture_big}" />
					</div>

					<div class="data_container">
						<h1>${data.title}</h1>
						<div class="small_details">
							<h2 class="creator">${data.creator.name}</h2>
							<p class="playlist_description">${data.description}</p>
						</div>
						<ul class="data">
							<li>${data.type}</li>
							<li>Duration: ${data.duration}</li>
							<li>Fans: ${data.fans}</li>
							<li>Number of songs: ${data.nb_tracks}</li>
						</ul>
						<div class="small_details">
							<button>Listen</button>
							<i>Heart Icon: ${data.is_loved_track}</i>
							<i>Share icon</i>
						</div>
					</div>

					<div class="track-list">
						<div class="first-line">
							<span class="span-title">TITLE</span>
							<span class="span-artist">ARTIST</span>
							<span class="span-album">ALBUM</span>
							<span class="span-date">DATE</span>
							<span class="span-duration">DURATION ICON</span>
						</div>
					
						<div class="track-container">
						
						 ${data.tracks.data.map(data => {

							// FIND A WAY TO EDIT THE HTML WITH THE TRACK INFO
							// document.querySelector('.track-container').innerHTML= `
							
							// <div class="track">
							// 	<div class="track-image">
							// 		<img src="${data.album.cover_big}" />
							// 	</div>
							// 	<div class="track-title">
							// 		<span>${data.title}"<span>
							// 	</div>
							// 	<div class="track-artist">
							// 		<span>${data.artist.name}"<span>
							// 	</div>
							// 	<div class="track-album">
							// 		<span>${data.album.title}"<span>
							// 	</div>
							// </div>
							
							// `
							 return data.title;
						 })}
						
						</div>
					
					
					
					
					
					</div>

				</div>
			</div>
			`
		})

	})

	artists.map(async (artist) => {
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

	albums.map(async (album) => {
		const data = await getData(`album/${album.number}`);
		console.log(data);

		startPodcast.innerHTML += `
		<div class="list">
		<div class="item">
		  <img src="${data.cover_big}" />
		  <div class="play">
			<span class="fa fa-play"></span>
		  </div>
		  <h4>${data.title}</h4>
		  <p>${data.artist.name}</p>
		</div>`;
	})

};
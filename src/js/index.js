// import * as bootstrap from '../../node_modules/bootstrap/js';
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
	// console.log(response);
	let data = await response.json();
	// console.log(data);
	return data;
};

// Randomizer

const randomizer = (limit) => Math.floor(Math.random()*limit);

// OnLoad function

const load = async (endpoint,limit) =>{

	let arrayData = [];
	
	for(let i = 0; i < 5; i++) {

	let data = await getData(endpoint+randomizer(limit));
	console.log(endpoint);
	arrayData.push(data);
	console.log(arrayData);}

	arrayData.map(data =>{


		if(data.type == "playlist")
				{startPlaylist.innerHTML += `
					<div class="list">
					<div class="item">
					  <img src="${data.picture_big}" />
					  <div class="play">
					<span class="fa fa-play" id='${data.id}'></span>
					  </div>
					  <h4>${data.title}</h4>
					  <p>${data.description}</p>
					</div>`;}
					else if(data.type == "artist"){
					
						startArtist.innerHTML += `
					<div class="list">
					<div class="item">
					  <img src="${data.picture_big}" />
					  <div class="play">
						<span class="fa fa-play" id='${data.id}'></span>
					  </div>
					  <h4>${data.name}</h4>
					  <p>${data.type}</p>
					</div>`;
					
					}
					else if(data.type == "album"){
						startPodcast.innerHTML += `
					<div class="list">
					<div class="item">
					  <img src="${data.cover_big}" />
					  <div class="play">
						<span class="fa fa-play" id='${data.id}'></span>
					  </div>
					  <h4>${data.title}</h4>
					  <p>${data.artist.name}</p>
					  
					</div>`;}

					//eventlistener Playbutton
					document.getElementById(data.id).addEventListener('click', () => {
							console.log("hi");
					
							mainContainer.innerHTML = `<img src="${data.picture_big}"/>`;
					})})
	}


		

	
		

// DOM connection

let startPlaylist = document.getElementById('playlistsStart');
let startArtist = document.getElementById('artistStart');
let startPodcast = document.getElementById('podcastStart');
let mainContainer = document.getElementById('main-container');



//ONLOAD

window.onload = () => {

	
		load("playlist/",1000);
		load("artist/",99999);
		load("album/",99999);
	}


		



		// 		
		// 	})
		// })
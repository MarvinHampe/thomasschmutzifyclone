// import * as bootstrap from '../../node_modules/bootstrap/js';
import {
  api
} from "./env.js";

// OPTIONS for APIs
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${api.deezer}`,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

//URLs für DEEZER API
const url = `https://deezerdevs-deezer.p.rapidapi.com/`;

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

const randomizer = (limit) => Math.floor(Math.random() * limit);

// OnLoad function

const load = async (endpoint, limit) => {
  let arrayData = [];

  for (let i = 0; i < 5; i++) {
    let data = await getData(endpoint + randomizer(limit));
    console.log(endpoint);
    arrayData.push(data);
    console.log(arrayData);
  }

  arrayData.map((data) => {
    if (data.type == "playlist") {
      startPlaylist.innerHTML += `
					<div class="list">
					<div class="item">
					  <img src="${data.picture_big}" />
					  <div class="play">
					<span class="fa fa-play" id='${data.id}'></span>
					  </div>
					  <h4>${data.title}</h4>
					  <p>${data.description}</p>
					</div>`;
    } else if (data.type == "artist") {
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
    } else if (data.type == "album") {
      startPodcast.innerHTML += `
					<div class="list">
					<div class="item">
					  <img src="${data.cover_big}" />
					  <div class="play">
						<span class="fa fa-play" id='${data.id}'></span>
					  </div>
					  <h4>${data.title}</h4>
					  <p>${data.artist.name}</p>
					  
					</div>`;
		}

	})
	document.querySelectorAll('.fa-play').forEach(play => {
		play.addEventListener('click', async (e) => {

			let filteredData = arrayData.filter(data => e.target.id == data.id ? true : false);
			const single = filteredData[0]
			console.log(single);
			
			switch(true){
				case single.type == "playlist":

					mainContainer.innerHTML = `
					<div id="cover"><img src="${single.picture_big}" class="profile-image" alt="Cover" /></div>
					<div id="info">
					<h2>${single.title}</h2>
					</div>
					<div id="tracklist"></div>`

					single.tracks.data.map( track =>{

						tracklist( track.album.cover_small, track.title, track.duration, track.artist.name)

					});
					break;
				case single.type == "artist":
					let data = await getData(`search?q=${single.name.split(" ").join("").toLowerCase().trim()}`);
					let tracks = [];
					tracks.push(data.data[0]);	
					console.log(tracks);
					
					mainContainer.innerHTML = `
					<div id="cover"><img src="${single.picture_big}" class="profile-image" alt="Cover" /></div>
					<div id="info">
					<h2>${single.name}</h2>
					</div>
					<div id="tracklist"></div>`
					

					tracks.map( track =>{

					tracklist( track.album.cover_small, track.title, track.duration, track.artist.name)

					});
					break;
				case single.type == "album":
					mainContainer.innerHTML = `
					<div id="cover"><img src="${single.cover_big}" class="profile-image" alt="Cover" /></div>
					<div id="info">
					<h2>${single.title}</h2>
					</div>
					<div id="tracklist"></div>`
					
					single.tracks.data.map( track =>{

						tracklist( track.album.cover_small, track.title, track.duration, track.artist.name)

					});
					

			}


		})
	});



}



// DOM connection

let startPlaylist = document.getElementById("playlistsStart");
let startArtist = document.getElementById("artistStart");
let startPodcast = document.getElementById("podcastStart");
let mainContainer = document.getElementById("main-container");

//ONLOAD

window.onload = () => {
  load("playlist/", 1000);
  load("artist/", 99999);
  load("album/", 99999);
};

// Function for the main container

const mainConstruct = (title, image) => {
	mainContainer.innerHTML =`
	<div id="cover"><img src="${image}" class="profile-image" alt="Cover" /></div>
	<div id="info">
	  <h2 id="info-title">${title}</h2>
	</div>
	<div id="tracklist"></div>
  </div>`;
};
const tracklist = (image, trackTitle, duration, artist, description) => {
  let container = document.getElementById("tracklist");
  let time = duration / 60;
  container.innerHTML += `
	<div class="track-box">
	<div id="cover">
	<img src="${image}" class="track-image" alt="Cover" />
	</div>
	<div id="info">
	<h2>${artist}</h2>
	<h3>${trackTitle}</h3>
	<p>${time.toFixed(2)}</p>
	</div>
	</div>

	`;
};

// Search field
const searchField = document.querySelector(".search-input");

searchField.addEventListener("change", async () => {
  const value = searchField.value.toLowerCase().trim().split(" ").join("");
  const data = await getData(`search?q=${value}`);
  searchField.value = "";
  let fetchedData = [];
  fetchedData.push(data.data);

  mainConstruct(
    fetchedData[0][1].album.title,
    fetchedData[0][1].album.cover_big
  );

  fetchedData[0].map((song) => {
    tracklist(
      song.artist.picture_small,
      song.title,
      song.duration,
      song.artist.name,
    );
  });
});
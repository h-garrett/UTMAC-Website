import { getCurrentVotingPhase } from "./schedule.js";
import { VotingPhase } from "./schedule.js";
import { votingPhases } from "./schedule.js";






const currentAlbum = {
    cover: "images/covers/once-in-a-long-long-while.png",
    title: "Once in a Long, Long, While...",
    artist: "Low Roar",
    link: "https://tidal.com/album/244423947",
    name: "Once in a Long, Long, While..."
};




function update() {

    const voteBox = document.querySelector(".vote-box");
    const voteStatus = document.querySelector("#vote-status-text");
    const voteButton = document.querySelector("#vote-link");
    const indicator = document.querySelector(".live-indicator");

    const currentPhase = getCurrentVotingPhase();
    const phase = votingPhases[getCurrentVotingPhase()];

    voteButton.textContent = phase.buttonText;
    voteStatus.textContent = phase.message;
    voteButton.hidden = phase.hideButton;
    voteButton.href = phase.buttonLink;
    indicator.id = phase.indicator;

    if (currentPhase === VotingPhase.LISTEN) {
        const card = document.createElement("div");
        card.className = "album-card";
        card.id = "aotw";

        const link = document.createElement("a");
        link.href = currentAlbum.link;
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = currentAlbum.cover;
        img.alt = "";

        link.appendChild(img);
        card.appendChild(link);
        voteBox.appendChild(card);

        const artist = document.createElement("span");
        artist.className = "artist-this-week";
        artist.textContent = currentAlbum.artist;

        const album = document.createElement("span");
        album.className = "album-this-week";
        album.textContent = currentAlbum.name;

        voteBox.appendChild(album);
        voteBox.appendChild(artist);
    }

}

update();


async function loadAlbums() {
    const response = await fetch("data/albums.json");
    const albums = await response.json();
    const grid = document.querySelector("#album-grid");

    albums.reverse().forEach((album) => {
    const card = document.createElement("div");
    card.className = "album-card"

    const link = document.createElement("a");
    link.href = album.url;
    link.target = "_blank";
    link.title = `${album.artist} - ${album.title}`;

    const img = document.createElement("img");
    img.src = `images/covers/${album.cover}`;
    img.alt = "";

    link.appendChild(img);
    card.appendChild(link);
    grid.appendChild(card);
});

}


loadAlbums();




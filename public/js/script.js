export const votingPhases = {
    "nominations" : {
        title: "Album Nominaitons",
        message: "Nominations open!",
        buttonText: "Nominate Now",
        indicator: "nominate-indicator",
        hideButton: false
    },

    "voting" : {
        title: "Voting",
        message: "Voting is Open!",
        buttonText: "Vote Now",
        indicator: "voting-indicator",
        hideButton: false
    },

    "closed" : {
        title: "Voting is Closed",
        message: "Album of the Week will be announced soon!",
        buttonText: "closed",
        indicator: "closed-indicator",
        hideButton: true
    },

    "listen" : {
        title: "Voting is closed",
        message: "ALBUM OF THE WEEK",
        buttonText: "listen",
        indicator: "listen-indicator",
        hideButton: true
    }
};

const response = await fetch("/api/albums");
if (!response.ok) {
    throw new Error("Could not load albums");
}
const albums = await response.json();


async function update() {

    const voteBox = document.querySelector(".vote-box");
    const voteStatus = document.querySelector("#vote-status-text");
    const voteButton = document.querySelector("#vote-link");
    const indicator = document.querySelector(".live-indicator");

    const response = await fetch("/api/current-phase");
    const data = await response.json();

    const phase = votingPhases[data.phase];
    console.log(phase);
    console.log(data);
    const currentPhase = data.phase;
    const currentAlbum = albums.at(-1);

    voteButton.textContent = phase.buttonText;
    voteStatus.textContent = phase.message;
    voteButton.hidden = phase.hideButton;
    voteButton.href = data.buttonLink;
    indicator.id = phase.indicator;

    if (currentPhase === "listen") {
        const card = document.createElement("div");
        card.className = "album-card";
        card.id = "aotw";

        const link = document.createElement("a");
        link.href = currentAlbum.url;
        link.target = "_blank";
        link.title = `${currentAlbum.artist} - ${currentAlbum.title}`

        const img = document.createElement("img");
        img.src = `../images/covers/${currentAlbum.cover}`;
        img.alt = "";

        link.appendChild(img);
        card.appendChild(link);
        voteBox.appendChild(card);

        const artist = document.createElement("span");
        artist.className = "artist-this-week";
        artist.textContent = currentAlbum.artist;

        const album = document.createElement("span");
        album.className = "album-this-week";
        album.textContent = currentAlbum.title;

        voteBox.appendChild(album);
        voteBox.appendChild(artist);
    }

    if (currentPhase === "closed"
        || currentPhase === "listen"
    ) {
        indicator.remove();
    }

    if (currentPhase === "nominations") {
        const response = await fetch("/api/genre");
        const data = await response.json();
        const genre = data.genre;

        const genreText = document.createElement("h2");
        genreText.id = "genre-text";
        genreText.textContent = `Genre: ${genre}`;
        voteBox.insertBefore(genreText, voteButton);
    }

}

update();


async function loadAlbumGrid() {

    const grid = document.querySelector("#album-grid");

    albums.slice(0, -1).forEach((album) => {
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


loadAlbumGrid();




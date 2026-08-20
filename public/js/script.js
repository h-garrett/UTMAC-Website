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
    },

    "custom" : {
        title: "",
        message: "",
        buttonText: "",
        indicator: "",
        hideButton: false
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

    const response = await fetch("/api/current-phase");
    const data = await response.json();

    const phase = votingPhases[data.phase];
    const currentPhase = data.phase;
    const currentAlbum = albums.at(-1);

    voteStatus.textContent = phase.message;

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

        const artist = document.createElement("div");
        artist.className = "artist-this-week";
        artist.textContent = currentAlbum.artist;

        const album = document.createElement("div");
        album.className = "album-this-week";
        album.textContent = currentAlbum.title;

        album.appendChild(artist);
        voteBox.appendChild(album);
        

        voteBox.style.setProperty('--color-start', '#161620');
        voteBox.style.setProperty('--color-end', '#161620');
        voteBox.style.gap = "8px";
    }

    if (currentPhase === "closed") {
        voteStatus.style.whiteSpace = "normal";
    }

    if (currentPhase === "voting" || currentPhase === "nominations") {
        
        // CREATE BUTTON
        const voteButton = document.createElement("a");
        voteButton.className = 'button';
        voteButton.id = 'vote-link';
        voteBox.appendChild(voteButton);
        voteButton.textContent = phase.buttonText;
        voteButton.target = '_blank';

        // GENRE
        const response = await fetch("/api/genre");
        const data = await response.json();
        const genre = data.genre;

        const genreText = document.createElement("h2");
        genreText.id = "genre-text";
        genreText.textContent = `Genre: ${genre}`;
        voteStatus.appendChild(genreText);

        if (currentPhase === "nominations") {
            // votebox gradient
            voteBox.style.setProperty('--color-start', '#b65f17');
            voteBox.style.setProperty('--color-end', '#fcf822e8');
            
            const response = await fetch("/api/settings/nomination");
            const data = await response.json();
            voteButton.href = data.nominationLink;
            genreText.style.textShadow = '1px 1px 4px var(--burnt-orange)';
        }

        if (currentPhase === "voting") {
            voteBox.style.setProperty('--color-start', '#18d431');
            voteBox.style.setProperty('--color-end', '#a4e4ad');

            const response = await fetch("/api/settings/voting");
            const data = await response.json();
            voteButton.href = data.votingLink;
            genreText.style.textShadow = '1px 1px 4px var(--green)';
        }
    }

    if (currentPhase === "custom") {
        const response = await fetch("/api/settings/custom-phase");
        const data = await response.json();

        voteStatus.textContent = data.customText;
        voteStatus.style.whiteSpace = "normal";


        if (data.showButton) {
            const voteButton = document.createElement("a");
            voteButton.target = '_blank';
            voteButton.className = 'button';
            voteButton.id = 'vote-link';
            voteButton.textContent = data.buttonText;
            voteButton.href = data.buttonLink;
            voteBox.appendChild(voteButton);
        }
    }

}

update();




async function loadAlbumGrid() {

    const grid = document.querySelector("#album-grid");

    albums.slice(0, -1).toReversed().forEach((album) => {
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




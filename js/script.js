

const VotingPhase = Object.freeze( {
    NOMINATIONS: "nominations",
    VOTING: "voting",
    CLOSED: "closed",
    LISTEN: "listen"
});

const votingPhases = {
    [VotingPhase.NOMINATIONS] : {
        title: "Album Nominaitons",
        message: "Nominations are open!",
        buttonText: "Nominate Now",
        buttonLink: "nominate.html",
        indicator: "nominate-indicator",
        hideButton: false
    },

    [VotingPhase.VOTING] : {
        title: "Voting",
        message: "Voting is Open!",
        buttonText: "Vote Now",
        buttonLink: "vote.html",
        indicator: "voting-indicator",
        hideButton: false
    },

    [VotingPhase.CLOSED] : {
        title: "Voting is Closed",
        message: "Voting is Closed",
        buttonText: "closed",
        buttonLink: "index.html",
        indicator: "closed-indicator",
        hideButton: true
    },

    [VotingPhase.LISTEN] : {
        title: "Voting is closed",
        message: "ALBUM OF THE WEEK",
        buttonText: "listen",
        buttonLink: "index.html",
        indicator: "listen-indicator",
        hideButton: true
    }
};


function getCurrentVotingPhase() {
    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const TENPM = 22 * 60;

    if (day === 1 || day === 2) { // mon-tues
        return VotingPhase.LISTEN;
    }

    if (day === 3) { // wed
        return minutes < TENPM ? VotingPhase.LISTEN : VotingPhase.NOMINATIONS;
    }

    if (day === 4) { //thurs
        return minutes < TENPM ? VotingPhase.NOMINATIONS : VotingPhase.VOTING;
    }

    if (day === 5) { // fri
        return minutes < TENPM ? VotingPhase.VOTE : VotingPhase.CLOSED;
    }

    return VotingPhase.CLOSED;
}


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


const albums = {
    "In_the_aeroplane_over_the_sea.jpg": "https://tidal.com/album/37265686",
    "Three_cheers_clean.jpg": "https://tidal.com/album/293931",
    "Mmfood.jpg": "https://tidal.com/album/143661100",
    "Björk_-_Vespertine_album_cover.jpg": "https://tidal.com/album/68715357",
    "Violent_Femmes.jpg": "https://tidal.com/album/192089978",
    "SystemofaDownToxicityalbumcover.jpg": "https://tidal.com/album/17825550",
    "Velvet_Underground_and_Nico.jpg": "https://tidal.com/album/17639797",
    "ModalMusic.jpg": "https://tidal.com/album/163793677",
    "Titanic_Rising.jpg": "https://tidal.com/album/106478328",
    "there-is-love-in-you.jpg" : "https://tidal.com/album/160159948",
    "Will_Wood_-_The_Normal_Album.jpg": "https://tidal.com/album/199347397",
    "Ants_from_Up_There_-_Black_Country,_New_Road.jpg": "https://tidal.com/album/201105433",
    "Ego_Death_at_a_Bachelorette_Party_-_Hayley_Williams.jpg": "https://tidal.com/album/470829563",
    "1999_Joey_Badass.jpg": "https://tidal.com/album/90134054",
    "Cocteau_Twins—Heaven_or_Las_Vegas.jpg": "https://tidal.com/album/2404954",
    "Lanquidity.jpg": "https://tidal.com/album/79564350",
    "3dcountry.jpg": "https://tidal.com/album/443964090",
    "habibifunk.jpg" : "https://tidal.com/album/453620168",
    "Superunknown.jpg": "https://tidal.com/album/77647353/track/77647358",
    "Travellingwithoutmoving.jpg": "https://tidal.com/album/117160041",
    "The_Sky's_Gone_Out.jpg": "https://tidal.com/album/102762862",
    "1000_gec_album.jpg": "https://tidal.com/album/129835816",
    "The_Glow_pt._2.jpg": "https://tidal.com/album/18083938",
    "Dream_Theater_-_Metropolis_Pt._2-_Scenes_from_a_Memory.jpg": "https://tidal.com/album/1844728",  
}


const grid = document.querySelector("#album-grid");

Object.entries(albums).toReversed().forEach(([file, url]) => {
    const card = document.createElement("div");
    card.className = "album-card"

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";

    const img = document.createElement("img");
    img.src = `images/covers/${file}`;
    img.alt = "";

    link.appendChild(img);
    card.appendChild(link);
    grid.appendChild(card);
});


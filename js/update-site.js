const VotingPhase = Object.freeze( {
    NOMINATIONS: "nominations",
    VOTING: "voting",
    CLOSED: "closed",
    LISTEN: "listen"
});

const votingPhases = {
    [VotingPhase.NOMINATIONS] : {
        title: "Album Nominaitons",
        message: "Nominations are open!"
    },

    [VotingPhase.VOTING] : {
        title: "Voting",
        message: "Voting is Open!"
    },

    [VotingPhase.CLOSED] : {
        title: "Voting is Closed",
        message: "Voting is Closed"
    },

    [VotingPhase.LISTEN] : {
        title: "Voting is closed",
        message: "Listen to the album of the week now!"
    }
}

const currentPhase = VotingPhase.VOTING;

const siteData = {
    votingPhase : votingPhases[currentPhase]
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
    cover: "images/covers/3dcountry.jpg",
    title: "Once in a Long, Long, While...",
    artist: "Low Roar",
    link: "https://tidal.com/album/244423947"
}

const currentPhase = getCurrentVotingPhase();

const siteData = {
    currentPhase,
    votingPhase: votingPhaseContent
}
export const VotingPhase = Object.freeze( {
    NOMINATIONS: "nominations",
    VOTING: "voting",
    CLOSED: "closed",
    LISTEN: "listen"
});

export const votingPhases = {
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


export function getCurrentVotingPhase() {
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
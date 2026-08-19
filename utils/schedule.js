

const VotingPhase = Object.freeze( {
    NOMINATIONS: "nominations",
    VOTING: "voting",
    CLOSED: "closed",
    LISTEN: "listen"
});


function getCurrentVotingPhase(settings) {
    if (settings.phaseOverride) {
        return settings.setPhase;
    }

    const now = new Date();

    const day = now.getDay();
    const hour = now.getHours();

    if (day === 0) {
        return VotingPhase.CLOSED;
    }

    if (day === 1 || day === 2) {
        return VotingPhase.LISTEN;
    }

    if (day === 3) {
        if (hour >= 22) {
            return VotingPhase.NOMINATIONS;
        }
        return VotingPhase.LISTEN;
    }

    if (day === 4) {
        if (hour >= 22) {
            return VotingPhase.VOTING;
        }
        return VotingPhase.NOMINATIONS;
    }

    if (day === 5) {
        if (hour >= 22) {
            return VotingPhase.CLOSED;
        }
        return VotingPhase.VOTING;
    }

    return VotingPhase.CLOSED;
}

module.exports = {
    VotingPhase,
    getCurrentVotingPhase
}
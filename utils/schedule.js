

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

    // Always evaluate the schedule in the voting timezone.
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        weekday: "short",
        hour: "numeric",
        hour12: false,
    }).formatToParts(now);

    const weekday = parts.find(p => p.type === "weekday").value;
    console.log(weekday);
    const hour = Number(parts.find(p => p.type === "hour").value);
    console.log(hour);

    switch (weekday) {
        case "Sun":
            return VotingPhase.CLOSED;

        case "Mon":
        case "Tue":
            return VotingPhase.LISTEN;

        case "Wed":
            return hour >= 22 ? VotingPhase.NOMINATIONS : VotingPhase.LISTEN;

        case "Thu":
            return hour >= 22 ? VotingPhase.VOTING : VotingPhase.NOMINATIONS;

        case "Fri":
            return hour >= 22 ? VotingPhase.CLOSED : VotingPhase.VOTING;

        default:
            return VotingPhase.CLOSED;
    }
}



module.exports = {
    VotingPhase,
    getCurrentVotingPhase
}
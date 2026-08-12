import { 
    getCurrentVotingPhase,
    votingPhases
 } from "./schedule.js";

const phaseView = document.querySelector("#vote-status-text");
const phase = getCurrentVotingPhase();

phaseView.textContent = votingPhases[phase].title;



const phaseView = document.querySelector("#vote-status-text");
const nominationForm = document.querySelector("#nomination-form");
const response = await fetch('/api/current-phase');
const data = await response.json();


phaseView.textContent = data.phase;





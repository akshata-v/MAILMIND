const generateBtn = document.getElementById("generateBtn");
const grammarBtn = document.getElementById("grammarBtn");

document.getElementById("generateBtn").addEventListener("click", function () {
    window.location.href = "/generate";
});


document.getElementById("grammarBtn").addEventListener("click", function () {
    window.location.href = "/grammar";
});
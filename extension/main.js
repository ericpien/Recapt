document.getElementById("searchButton").addEventListener("click", search);
document.getElementById("summarize").addEventListener("click", summarize);

function search() {
    let inputText = document.getElementById("input").value;
    alert(inputText);
}

function summarize() {
    alert("summarize");
}
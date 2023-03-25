let currentURL;

document.getElementById("searchButton").addEventListener("click", search);
document.getElementById("summarize").addEventListener("click", summarize);


function setURL() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        this.currentURL =  tabs[0].url; 
    });
}

async function search() {
    let activeTab = await getActiveTab();
    let inputText = document.getElementById("input").value;
    alert(activeTab.url + " " + inputText);
}

async function summarize() {
    console.log("hello I'm here");
    let activeTab = await getActiveTab();
    alert(activeTab.url + " " + "summarize");
}

function getActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            resolve(activeTab);
        });
    });
}
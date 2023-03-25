let currentURL;

document.getElementById("searchButton").addEventListener("click", search);
document.getElementById("summarize").addEventListener("click", summarize);


function setURL() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        this.currentURL =  tabs[0].url; 
    });
}

async function search() {
    // let activeTab = await getActiveTab();
    let inputText = document.getElementById("inputBox").value;
    //alert(activeTab.url + " " + inputText);
    alert(inputText);
}

async function summarize() {
    // let activeTab = await getActiveTab();
    // alert(activeTab.url + " " + "summarize");
    alert("summarize");
}

function getActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            resolve(activeTab);
        });
    });
}
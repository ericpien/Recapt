/*
* Interaction with Youtube referenced from https://github.com/avrebarra/youtube-loop
* 
*/ 

// constants to identify change in page / location of elements 
const CONSTANTS = {
    PAGE_IDENTIFIER: 'head title',
    YOUTUBE_CONTROLS: 'div.ytp-chrome-controls > div.ytp-right-controls',
    CC_BUTTON: 'button.ytp-subtitles-button',
}

const ENV_VAR = {
    ip: 'localhost',  
    port: '8080'
}

// icon in svg format
const icon = '<svg x="0px" y="0px" width="80%" height="80%" viewBox="0 0 40 40" version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"xml:space="preserve"> <style type="text/css"> .flatshadows_een{fill:#FDFFFF;} .flatshadows_twee{fill:#E1E5E5;} .flatshadows_drie{fill:#C4CCCC;} .flatshadows_vijf{fill:#8D9999;} .st0{fill:#A3AFAF;} .st1{fill:#C4CCCC;} .st2{fill:#404041;} .st3{fill:#737F7F;} </style> <g> <polygon class="flatshadows_twee" points="32,20 23,20 19,24 15,20 6,20 6,2 32,2 	"/> <polygon class="flatshadows_een" points="26,26 17,26 13,30 9,26 0,26 0,8 26,8 	"/> <polygon class="flatshadows_drie" points="26,8 32,14 32,20 26,20 	"/> <rect x="9" y="14" class="flatshadows_vijf" width="8" height="1"/> <rect x="9" y="16" class="flatshadows_vijf" width="8" height="1"/> <rect x="9" y="18" class="flatshadows_vijf" width="8" height="1"/> </g> </svg>'

class YouTubeGPTButton {
    constructor() {
        this.URL = '';
        this.newButton = false;
        this.newWindow = false;

        this.DOCUMENT = {
            'head': document.querySelector(CONSTANTS.PAGE_IDENTIFIER),
            'youTubeControls': null,
            'ccButton': null
        }

        let observer = new MutationObserver((mutations) => {
            this.pageObserver();
        })

        observer.observe(this.DOCUMENT.head, {
            attributes: true,
            childList: true,
            characterData: true
        })
    }

    // Observe change in websites. If there is a change, check if a button needs to be created
    pageObserver() {
        // 1. If the button already exists, stop.
        if (this.DOCUMENT.YouTubeGPTButton) {
            return;
        }

        // 2. If the site contains youtube elements, create button.
        this.DOCUMENT.youTubeControls = document.querySelector(CONSTANTS.YOUTUBE_CONTROLS);
        this.DOCUMENT.ccButton = document.querySelector(CONSTANTS.CC_BUTTON);
        if (this.DOCUMENT.youTubeControls && this.DOCUMENT.ccButton) {
            this.createButton();
        }
    }

    // Create button
    createButton() {
        if (this.newButton) {
            return;
        }
        
        let newButton = document.createElement('button');
    
        // set attributes
        newButton.classList.add(...['ytp-gpt-button', 'ytp-button']);
        newButton.innerHTML = icon;

        // insert it after the CC button
        this.DOCUMENT.youTubeControls.insertBefore(newButton, this.DOCUMENT.ccButton.nextSibling);

        newButton.addEventListener("click", this.createWindow);
        this.newButton = newButton;
    }

    // Create interactive window 
    createWindow() {
        if (this.newWindow) {
            return;
        }

// {/*  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}

        // adding style sheet
        var head = document.getElementsByTagName('head')[0];

        var meta = document.createElement('meta');
        meta.httpEquiv = "Content-Security-Policy";
        meta.content = "upgrade-insecure-requests";
        head.appendChild(meta);

        var link = document.createElement('link');
        link.href = chrome.runtime.getURL('main.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        head.appendChild(link);

        var script = document.createElement('type');
        script.type = "text/javascript";
        script.src = "https://www.turnjs.com/lib/turn.min.js";
        head.appendChild(script);



        // add the window in html
        const inArea = document.getElementById("below");
        const beforeArea = document.getElementById("comments");
        let newWindow = document.createElement('div');
        newWindow.setAttribute("id", "newWindow");
        newWindow.setAttribute("class", "style-scope ytd-watch-flexy");
        newWindow.setAttribute("style", "z-index=3");
        newWindow.innerHTML += '<form><input class="inputBox" placeholder="Search.." id="inputBox"></input></form> <button class="searchButton" id="searchButton">Search</button> <button class="searchButton" id="summarize">Summarize</button>';
        
        inArea.insertBefore(newWindow,beforeArea);
        this.newWindow = newWindow;

        document.getElementById("searchButton").addEventListener("click", search);
        document.getElementById("summarize").addEventListener("click", summarize);        
    }
}

function search() {
    let activeTab = document.URL;
    let inputText = document.getElementById("inputBox").value;
    //alert(activeTab + " " + inputText);
    processClick(activeTab,inputText);
}

function summarize() {
    let activeTab = document.URL;
    //alert(activeTab + " " + "summarize");
    processClick(activeTab,"summarize");
}

function processClick(url, request) {
    fetch_url = `http://${ENV_VAR.ip}:${ENV_VAR.port}/response?url=${url}&search_text=${request}`
    
    console.log(fetch_url);
    fetch(fetch_url)
        .then(response => {
            //console.log(response)
            return response.json();
        }) 
        .then(json => {
            //console.log(json);
            // TODO!! Process json 
        })
        .catch(error => {
            console.log(error);
        });
}

let youTubGPTButton = new YouTubeGPTButton()
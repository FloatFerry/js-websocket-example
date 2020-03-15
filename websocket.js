const url = "ws://echo.websocket.org/";
const webSocket = new WebSocket(url);
let result;

function pushClient(msg) {
    const output = document.createElement("p");
    output.style.fontSize = "24px";
    output.style.color = "blue";
    output.innerHTML = msg;
    result.appendChild(output);
}

function getError(error) {
    pushClient(`Error! ${error.data}`);
}

function getMessage(msg) {
    pushClient(`Receive : ${msg.data}`);
    webSocket.close();
}

function sendMessage(msg) {
    pushClient(`Send : ${msg}`);
    webSocket.send(msg);
}

function connectClose(event) {
    pushClient("Connection Closed.");
}

function connectOpen(event) {
    pushClient("Connection Opened.");
    sendMessage("Hello World!");
}

function connectSocket() {
    webSocket.onopen = function(event) { connectOpen(event); };
    webSocket.onclose = function(event) { connectClose(event); };
    webSocket.onmessage = function(msg) { getMessage(msg); };
    webSocket.onerror = function(error) { getError(error); };
}

function init() {
    result = document.querySelector(".result");
    connectSocket();
}

window.addEventListener("load", init);
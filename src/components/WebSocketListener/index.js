import React from 'react';

export class WebSocketListener extends React.Component {
    constructor(props) {
        super(props);

        // http://localhost:3000/ or ws://echo.websocket.org/
        this.wsUri = "ws://localhost:8080/";
        this.websocket = null;

        this.outputRef = React.createRef();

        this.init = this.init.bind(this);
    }

    init()
    {
        this.testWebSocket();
    }

    testWebSocket()
    {
        this.websocket = new WebSocket(this.wsUri);
        this.websocket.onopen = (evt) => { this.onOpen(evt) };
        this.websocket.onclose = (evt) => { this.onClose(evt) };
        this.websocket.onmessage = (evt) => { this.onMessage(evt) };
        this.websocket.onerror = (evt) => { this.onError(evt) };
        console.log(this.websocket)
    }

    onOpen(evt)
    {
        this.writeToScreen("CONNECTED");
        this.doSend("WebSocket rocks");
    }

    onClose(evt)
    {
        this.writeToScreen("DISCONNECTED");
    }

    onMessage(evt)
    {
        this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
        // this.websocket.close();
    }

    onError(evt)
    {
        this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    doSend(message)
    {
        this.writeToScreen("SENT: " + message);
        this.websocket.send(message);
    }

    writeToScreen(message)
    {
        const pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        this.outputRef.current.appendChild(pre);
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return(
            <div>
                WebSocket listener:
                <div ref={this.outputRef} id={"output"} />
            </div>
        )
    }
}

export default WebSocketListener
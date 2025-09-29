import net from "node:net";

const clients = [];

const server = net.createServer((socket) => {
    socket.setEncoding("utf8");
    socket.authenticated = false;
    socket.joined = false;
    socket.username = "";
    
    
    console.log("New Client Connected...")
    clients.push(socket)



    // Process data assuming each 'data' event is a complete message.
    socket.on("data", (data) => {
        const parsedMessage = parseMessage(data)
        if(!parsedMessage) {
            console.error("Invalid message format.")
            return;
        }

        handleMessage(socket, parsedMessage)
    })
})



function handleMessage(socket, parsedMessage) {
    
}

function parseMessage(data) {
    const parts = data.split("\r\n\r\n")
    if(parts.length < 2) return null; // misisng body delimeter

    
    const headerPart = parts[0];
    const body = parts.slice(1).join('\r\n\r\n');
    const headerLines = headerPart.split('\r\n');
    // console.log(headerLines)
    if(headerLines.length === 0) return null;
    const firstLine = headerLines[0].split(" ");
    // console.log(firstLine)
    if(firstLine.length < 2) return null;

    const protocolVersion = firstLine[0];
    const command = firstLine[1]

    const headers = {};
    let contentLength = 0;
    for(let i = 1; i < headerLines.length; i++) {

        let line = headerLines[i];
        
        let pair = line.split(":")

        const [key, value] = pair;
        headers[key.trim()] = value.trim()

        if(key.trim().toLowerCase() === "content-length") {
            contentLength = parseInt(value.trim(), 10)
        }
    }

    // Optional Check

    if(body.length !== contentLength) {
        console.warn(`Warning: body length  ${body.length} does not match content length header.`)
    }

    return {protocolVersion, command, headers, body}

}

server.listen(2222, () => {
    console.log("Server is listening on port:- 2222")
});
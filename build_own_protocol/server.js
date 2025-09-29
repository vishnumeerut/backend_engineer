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
        // console.log("parsedMessage is:-", parsedMessage)
        if(!parsedMessage) {
            console.error("Invalid message format.")
            return;
        }

        handleMessage(socket, parsedMessage)
    })
})



function handleMessage(socket, parsedMessage) {
    switch(parsedMessage.command){
        case "AUTH":
            handleAuth(socket, parsedMessage)
            break;
        // case "JOIN":
        //     handleJoin(socket, parsedMessage)
        //     break;
        
    }
}

function handleAuth(socket, parsedMessage) {
    const user = parsedMessage.headers.User
    const token = parsedMessage.headers.Token


    // todo: move secret to somewhere in db don't  hard code.

    if(user && token && token === "secret123"){
        socket.authenticated = true,
        socket.username = user

        const result = formatResponse("OK", "AUTH", {"Content-Length":0}, "")
        socket.write(result);

    }
}

function formatResponse(command, responseFor, headers, body, user) {
    const startLine = `CHAT/1.0 ${command}`
    const headerLines = [];
    headerLines.push(`Response-for: ${responseFor}`);
    if(user){
        headerLines.push(`${user}`)
    }

    for(const key in headers){
        headerLines.push(`${key}: ${headers[key]}`)
    }


    return `${startLine}\r\n${headerLines.join("\r\n")}\r\n\r\n${body}`
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
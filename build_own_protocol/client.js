
import readline from "node:readline/promises";
import net from "node:net";

import {stdin, stdout} from "node:process";

const HOST = "localhost";
const PORT = 2222;

async function startChat() {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    })



    // Open a  TCP Connection

    const client = net.createConnection({port:PORT, host:HOST}, () => {
        console.log("✅ Connected to server!");
    })


    // Get User Details 

    const username = await rl.question("Enter Your Username:->")
    const token = await rl.question("Enter your token :->")


    // prepare auth command
    const authCommand = buildCommand(
        "AUTH",
        {User:username, Token:token, "content-length":0},
        ""
    )


    client.write(authCommand);

    client.on('data', (data) => {
        console.log('Received: ', data.toString());
    });





}

startChat();


function buildCommand(command, headers, body) {
    /**
        CHAT/1.0 AUTH
        User: alice
        Token: secret123
        Content-Length: 0

        body
     */

    const startLine = `CHAT/1.0 ${command}`
    const headerLines = [];

    for(let key in headers) {
        headerLines.push(`${key}:${headers[key]}`)
    }


    return `${startLine}\r\n${headerLines.join('\r\n')}\r\n\r\n${body}`;
    
}
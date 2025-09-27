import readline from "node:readline/promises";
import net from "node:net";

const HOST = "localhost";
const PORT = 2222
async function startChat () {
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:":->"
    })

    const answer = await rl.question("How are You!")
    console.log("Output is:-", answer)


    // Open a TCP Connection


    const client = net.createConnection({host:HOST, port:PORT}, () => {
        console.log("Connected to the server..")
    })

    client.on("data", (data) => {
        console.log("Data received by client:-", data.toString())
    })



}



startChat()
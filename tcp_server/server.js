import net from "node:net";


const server = net.createServer((socket) => {
    console.log("Client Connected..")
    socket.on("data", (chunk) => {
        console.log("Data Received by server:-", chunk.toString());

        socket.write(`Received by client:-> ${chunk}`);
        socket.end()
    })

    socket.on("error", (err) => {
        console.log("Error is:-", err)
    })

    
})


server.listen(2323, () => {
    console.log("Server is running on port number:-> 2323")
})
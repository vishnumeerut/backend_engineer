import net from "node:net";


const server = net.createServer((socket) => {
    console.log("Client Connected...")


    // socket.write("Welcome to the build protocol")


    socket.on("data", (data) => {
        console.log(`Data received:-> ${data.toString()}`)
    })
})



server.listen(2222, () => {
    console.log("Server is listening on port:- 2222")
});
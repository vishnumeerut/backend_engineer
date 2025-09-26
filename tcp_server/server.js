import net from "node:net";


const server = net.createServer((socket) => {
    console.log("Server Connected..")
})


server.listen(2323, () => {
    console.log("Server is running on port number:-> 2323")
})
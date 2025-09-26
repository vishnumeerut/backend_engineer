import net from "node:net";

const clients = [];
const server = net.createServer((socket) => {
    console.log("Client Connected..")

    clients.push(socket);
    console.log(`Total clients are:- ${clients.length} \n`)

    socket.write("Welcome to the broadcast Chat: \n")
    socket.write("Type your message and press enter: \n")


    socket.on("data", (chunk) => {
        console.log("Data Received by server:-", chunk.toString().trim());

        clients.forEach((client) => {

            client.write(`Received by client:-> ${chunk} \n`);
        })


        socket.on("end", () => {
            const index = clients.indexOf(socket)
            if(index !== -1) {
            clients.splice(index, 1)
        }
        })
        console.log("One Client disconnected")
        console.log(`Total clients are:- ${clients.length} \n`)

    })

    socket.on("error", (err) => {
        console.log("Error is:-", err)
    })

    
})


server.listen(2323, () => {
    console.log("Server is running on port number:-> 2323")
})
import readline from "node:readline/promises"

async function startChat () {
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:":->"
    })

    const answer = await rl.question("How are You!")
    console.log("Output is:-", answer)

}



startChat()
const numbers = {}
process.on('message', msg => {
    for(let i=0; i<msg.cant; i++) {
        let num = Math.floor(Math.random()*1000)+1
        if(numbers[num]) {
            numbers[num] += 1
        } else {
            numbers[num] = 1
        }
    }
    process.send({numbers: numbers})
    process.exit()
})

process.send('ready')
import { fork } from 'child_process'

export const generateRandoms = async (cant) => {
    const forked = fork('randomManager.js')
    forked.on('message', msg => {
        if(msg.numbers){
            return msg.numbers
        } else {
            forked.send({cant: cant})
        }
    })
}
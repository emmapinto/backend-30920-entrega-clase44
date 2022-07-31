import { args } from '../index.js'
import os from 'os'

export const getInfo = () => {
    const argList = {
        ...args,
        _: [...args._].toString()
    }
    if(!argList._) delete argList._
    delete argList.$0
    const info = {
        args: argList,
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage().rss,
        path: process.execPath,
        pid: process.pid,
        directory: process.cwd(),
        procesadores: os.cpus().length
    }
    if(args.consola) console.log(info)
    return info
}
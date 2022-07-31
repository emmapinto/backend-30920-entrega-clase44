// Server setup
import express from 'express'
import os from 'os'
import { Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import compression from 'compression'
import session from 'express-session'
import passport from 'passport'
//import mongoose from 'mongoose'
import MongoStore  from 'connect-mongo'
import apiRoutes from './rutas/products.js'
import userRoutes from './rutas/users.js'
import randomRoutes from './rutas/randoms.js'
import authRoutes from './rutas/auth.js'
import infoRoutes from './rutas/info.js'
import ioConnection from './rutas/mensajes.js'
//Usando GraphQL
import ControladorGraphQl from './controladores/graphql.js'

import 'dotenv/config'
import _yargs from 'yargs'
import log4js from 'log4js'
log4js.configure({
    appenders: {
        consola: { type: 'console' },
        warnings: { type: 'file', filename: 'warn.log' },
        errores: { type: 'file', filename: 'error.log'}
    },
    categories: {
        default: { appenders: ['consola'], level: 'all'},
        warning: { appenders: ['warnings', 'consola'], level: 'warn'},
        errores: { appenders: ['errores', 'consola'], level: 'error'}
    }
})

const yargs = _yargs(process.argv.slice(2))
export const args = await yargs
    .alias('p', 'puerto')
    .default('puerto', 8080)
    .default('modo', 'fork')
    .default('gzip', false)
    .default('consola', false)
    .default('persistencia', 'mongo')
    .coerce('puerto', function(arg) {
        if(arg[1]){
            return arg[0]
        } else {
            return arg
        }
    }).argv

// process.env.PERSISTENCIA = process.argv[2] || args.persistencia

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
if(args.gzip) app.use(compression())

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*10
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    let logger = log4js.getLogger()
    logger.info(`RUTA: ${req.path} - METODO: ${req.method}`)
    return next()
})

// Workaround porque no funciona __dirname al trabajar en módulos
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// HBS setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

// RUTAS
import realizarPruebas from './tests/pruebasCliente.js' 
app.get('/pruebas', async (req, res) => {
    await realizarPruebas()
    res.send('done')
})
app.use(authRoutes)
app.use('/products_api', apiRoutes)
app.use('/users', userRoutes)
app.use('/api', randomRoutes)
app.use('/info', infoRoutes)
app.use('/graphql', new ControladorGraphQl())
app.get('*', (req, res) => {
    let logger = log4js.getLogger('warning')
    logger.warn(`RUTA: ${req.path} - METODO: ${req.method}`)
    res.send('Not found')
})


const PORT = process.env.PORT || args.puerto
const startServer = () => {
    const httpServer = new HttpServer(app)
    const io = new IOServer(httpServer)
    ioConnection(io)
    //mongoose.connect(process.env.MONGO_URL)
    const server = httpServer.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT} - PID worker: ${process.pid}`)
    })
    server.on('error', (err) => {
        console.error(`Server error: ${err}`)
    })
}

if(args.modo === 'cluster' || args.modo === 'CLUSTER') {
    const { default: cluster } = await import('cluster')
    if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)
        const cpuCount = os.cpus().length
        for(let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        startServer()
    }
} else {
    startServer()
}
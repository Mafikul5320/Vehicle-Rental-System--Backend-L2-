import express from 'express'
import config from './config'
import { initDB } from './config/DB'

const app = express()



initDB()


app.get('/', (req, res) => {
    res.send('Vehicle Rental System')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log("Server conected...")
})
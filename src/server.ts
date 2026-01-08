import express from 'express'
import config from './config'
import { initDB } from './config/DB'
import { userRouter } from './modules/users/users.route';

const app = express();
app.use(express.json())

initDB();



app.use("/api/v1/auth", userRouter)




app.get('/', (req, res) => {
    res.send('Vehicle Rental System')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log("Server conected...")
})
import dotenv from "dotenv"

dotenv.config();

const config = {
    port: process.env.PORT,
    secretPrivateKey: process.env.SECRET_KEY
}

export default config
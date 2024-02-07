import express from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import router from './src/routers/logo.js'
import ProfileRouter from './src/routers/profileIcon.js'
import HeartRouter from './src/routers/heartIcon.js'
import ShopRouter from './src/routers/shopIcon.js'

const app = express()
app.use(cors())
app.use(express.json())



app.use('/logo', router )
app.use('/profileicon', ProfileRouter)
app.use('/hearticon', HeartRouter)
app.use('/shopicon', ShopRouter)

const url=process.env.CONNECTION_URL.replace("<password>",process.env.PASSWORD)
const PORT=process.env.PORT

mongoose.connect(url).then(()=>console.log("connected")).catch((error)=>console.log({message:error}))
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
import express from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import router from './src/routers/logo.js'
import ProfileRouter from './src/routers/profileIcon.js'
import HeartRouter from './src/routers/heartIcon.js'
import ShopRouter from './src/routers/shopIcon.js'
import userRouter from './src/routers/user.js'
import teamRouter from './src/routers/team.js'
import blogRouter from './src/routers/blog.js'
import blogCategoryRouter from './src/routers/blogCategory.js'
import blogTagRouter from './src/routers/blogtag.js'
import faqRouter from './src/routers/faq.js'
import spaServicesRouter from './src/routers/spa-services.js'
import spaCategoryServicesRouter from './src/routers/spaCategoryServices.js'
import instaRouter from './src/routers/insta.js'

import { notFound,errorHandler } from './src/middleware/errorMiddleware.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// app.use(notFound)
// app.use(errorHandler)

app.use('/logo', router )
app.use('/insta', instaRouter )
app.use('/profileicon', ProfileRouter)
app.use('/hearticon', HeartRouter)
app.use('/shopicon', ShopRouter)
app.use('/users',userRouter)
app.use('/team',teamRouter)
app.use('/blog',blogRouter)
app.use('/blogCategory',blogCategoryRouter)
app.use('/blogTag',blogTagRouter)
app.use('/faq',faqRouter)
app.use('/spa-services',spaServicesRouter)
app.use('/spaCategoryServices',spaCategoryServicesRouter)

const url=process.env.CONNECTION_URL.replace("<password>",process.env.PASSWORD)
const PORT=process.env.PORT

mongoose.connect(url).then(()=>console.log("connected")).catch((error)=>console.log({message:error}))
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
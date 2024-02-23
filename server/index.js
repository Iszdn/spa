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
import galleryRouter from './src/routers/gallery.js'
import MarkaRouter from './src/routers/marka.js'
import BookingRouter from './src/routers/booking.js'
import ContactRouter from './src/routers/contact.js'
import ResetRouter from './src/routers/resetPassword.js'
import ReviewRouter from './src/routers/review.js'
import Stripe from 'stripe';
import bodyParser from 'body-parser';
// import Price from "./routers/PriceRouter.js";
import { jwtDecode } from "jwt-decode";





const stripe = new Stripe(process.env.SECRET_KEY);

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
app.use('/gallery',galleryRouter)
app.use('/marka',MarkaRouter)
app.use('/booking',BookingRouter)
app.use('/contact',ContactRouter)
app.use('/resetPassword',ResetRouter)
app.use('/review',ReviewRouter)




app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});


const url=process.env.CONNECTION_URL.replace("<password>",process.env.PASSWORD)
const PORT=process.env.PORT

mongoose.connect(url).then(()=>console.log("connected")).catch((error)=>console.log({message:error}))
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
// index.js in Function folder of Backend NodeJS
const functions = require("firebase-functions");
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors //cross origin resource sharing
const stripe = require("stripe")("sk_test_51KKlZBSHEIi90ETztXrtQZuhVB2KRNVT2gQJw2GCOIMP2Dx6JCqD03ly4d4KwyWrL0ePOKJFDIvTj7ywoT3YuBHO00JZzwdpSY"); // npm i stripe

// API

// - App config //Setting up Express Server
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API Routes
app.get('/', (request, response)=>response.status(200).send('hello world'));

app.post('/payments/create', async(request, response) =>{
   const total = request.query.total;
   console.log("Total Payment Recieved>>", total);

   const paymentIntent = await stripe.paymentIntent.create({
       amount : total, // In Paise Value not in Rupees
       currency: "INR",
   });
   response.status(201).send({
       clientSecret: paymentIntent.client-secret,
   })
   
} )


// - Listen Command
exports.api = functions.https.onRequest(app);

// -> In Terminal under functions> firebase emulators:start
// Endpoint
// http://localhost:5001/clone-d5abf/us-central1/api



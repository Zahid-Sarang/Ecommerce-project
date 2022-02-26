const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KKlZBSHEIi90ETztXrtQZuhVB2KRNVT2gQJw2GCOIMP2Dx6JCqD03ly4d4KwyWrL0ePOKJFDIvTj7ywoT3YuBHO00JZzwdpSY");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world!!!"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request:", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
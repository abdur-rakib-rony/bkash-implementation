const express = require("express")
const {
   createPayment,
   executePayment,
   searchTransaction,
   refundTransaction,
} = require("bkash-payment")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 8000

// Middleware setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const bkashConfig = {
   base_url : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
   username: 'sandboxTokenizedUser02',
   password: 'sandboxTokenizedUser02@12345',
   app_key: '4f6o0cjiki2rfm34kfdadl1eqq',
   app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'
  }

app.post("/bkash-checkout", async (req, res) => {
   try {
      const { amount, callbackURL, orderID, reference } = req.body
      const paymentDetails = {
         amount: amount || 10,
         callbackURL: callbackURL,
         orderID: orderID || "Order_101",
         reference: reference || "1",
      }
      const result = await createPayment(bkashConfig, paymentDetails)
      res.status(200).send(result)
   } catch (e) {
      console.log(e)
   }
})

app.get("/bkash-callback", async (req, res) => {
   try {
      const { status, paymentID } = req.query
      let result
      let response = {
         statusCode: "4000",
         statusMessage: "Payment Failed",
      }
      if (status === "success")
         result = await executePayment(bkashConfig, paymentID)

      if (result?.transactionStatus === "Completed") {
         // payment success
         // insert result in your db
      }
      if (result)
         response = {
            statusCode: result?.statusCode,
            statusMessage: result?.statusMessage,
         }
      res.redirect("http://localhost:3000")
   } catch (e) {
      console.log(e)
   }
})

app.post("/bkash-refund", async (req, res) => {
   try {
      const { paymentID, trxID, amount } = req.body
      const refundDetails = {
         paymentID,
         trxID,
         amount,
      }
      const result = await refundTransaction(bkashConfig, refundDetails)
      res.send(result)
   } catch (e) {
      console.log(e)
   }
})

app.get("/bkash-search", async (req, res) => {
   try {
      const { trxID } = req.query
      const result = await searchTransaction(bkashConfig, trxID)
      res.send(result)
   } catch (e) {
      console.log(e)
   }
})

app.listen(port, () =>
   console.log(`Example app listening at http://127.0.0.1:${port}`)
)

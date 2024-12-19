import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// creating an order
export const createOrder = async(req, res) => {
  let { amount } = req.body;
  console.log("request", req.body);
  const options = {
    amount: amount * 100, // 500 * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  razorpay.orders.create(options, function (err, order) {
    // for every transaction a new order id is generated
    console.log(
      "newly generated order id from backend razorpay.js",
      order,
      err
    );
    res.send({ orderId: order?.id });
  });
};


// payment verfication
export const verifyPayment =  async(req, res) => {
  let body = req.body.orderId + "|" + req.body.paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", "ObqLEeSpRqphtxBZI88ju0E7")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.signature);
  console.log("sig generated ", expectedSignature);
  let response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.signature)
    response = { signatureIsValid: "true" };
  res.send(response);
};


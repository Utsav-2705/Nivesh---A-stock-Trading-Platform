require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Authentication Route
const authRoute = require("./Routes/AuthRoute");

// Existing Models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Middleware
{/*app.use(
  cors({
    origin: [
      "https://nivesh-a-stock-trading-platform.vercel.app",
      "https://nivesh-a-stock-trading-platform-uacf-lpenhp245.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);*/}
app.use(
  cors({
    origin: [
      "https://nivesh-a-stock-trading-platform.vercel.app",
      "https://nivesh-a-stock-trading-platform-uacf-lpenhp245.vercel.app",
      "https://nivesh-a-stock-trading-platform-bafd-mrwy427bz.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);



app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Authentication Routes
// If AuthRoute contains routes like "/signup" and "/login",
// then APIs will be:
// POST http://localhost:3002/signup
// POST http://localhost:3002/login
app.use("/", authRoute);
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Existing APIs
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

/*app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order saved!");
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/
 app.post("/newOrder", async (req, res) => {
  try {
    console.log("Order received:", req.body);

    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();

    console.log("Order saved successfully");

    res.status(200).json({
      success: true,
      message: "Order saved!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});
// Database Connection + Server Start
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
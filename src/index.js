import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/orders.routes.js"

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 7000;


app.use(express.json());

// Routes
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)


connectDB()
.then(
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} `);
      })
)
.catch((err)=> {
    console.log("MongoDB connection Failed: "+ err.message);
    
})

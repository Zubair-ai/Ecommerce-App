import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import Signin from './routes/Signin.js';
import Login from "./routes/Login.js"
import testmiddleware from './routes/testmiddleware.js';
import UserAuth from "./routes/UserAuth.js";
import cors from "cors";
import forgetPassword from "./routes/ForgetPassword.js";
import AdminAuth from './routes/AdminAuth.js';
import CategoryRouter from "./routes/Category/CategoryRouter.js";
import CategoryUpdateRouter from "./routes/Category/CategoryUpdateRouter.js";
import AllCategory from "./routes/Category/AllCategory.js";
import SingleCategory from "./routes/Category/SingleCategory.js";
import DeleteCategory from "./routes/Category/DeleteCategory.js"
import ProductRouter from "./routes/Product/ProductRouter.js";
import AllProducts from "./routes/Product/CRUD/GetProducts.js";
import GetPhoto from "./routes/Product/CRUD/GetPhoto.js";
import SingleProduct from "./routes/Product/CRUD/SingleProduct.js";
import UpdateProduct from "./routes/Product/CRUD/UpdateProduct.js";
import DeleteProduct from "./routes/Product/CRUD/DeleteProduct.js";
import Filter from "./routes/FilterProduct/Filter.js";
import ProductCount from "./routes/FilterProduct/ProductCount.js";
import LoadMore from "./routes/FilterProduct/LoadMore.js";
import SearchProduct from "./routes/FilterProduct/SearchProduct.js";
import SimilarProduct from "./routes/Product/CRUD/SimilarProduct.js";
import CategoryWiseProduct from "./routes/Product/CRUD/CategoryWiseProduct.js";
import UpdateUserProfile from "./routes/UpdateUserProfile.js";
import BrainTree from "./routes/Payments/BrainTree.js";
import Payments from "./routes/Payments/Payments.js";
import Orders from "./routes/orders/Orders.js";
import OrderStatus from "./routes/orders/OrderStatus.js";
import AllOrders from "./routes/orders/AllOrders.js";
import path from "path";

// configure env
dotenv.config();

// database config
connectDB();

// rest objects
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')));

// routers
// Auth routers
app.use("/api", Signin);
app.use("/api", Login);
app.use("/api", testmiddleware);
app.use("/api", UserAuth);
app.use("/api", AdminAuth);
app.use("/api",forgetPassword);
app.use("/api",UpdateUserProfile);
// category routers
app.use("/api",CategoryRouter);
app.use("/api",CategoryUpdateRouter);
app.use("/api",AllCategory);
app.use("/api",DeleteCategory);
app.use("/api",SingleCategory);
// Product routers
app.use("/api",ProductRouter);
app.use("/api",AllProducts);
app.use("/api",GetPhoto);
app.use("/api",SingleProduct);
app.use("/api",UpdateProduct);
app.use("/api",DeleteProduct);
//  Product filter router
app.use("/api",Filter);
app.use("/api",ProductCount);
app.use("/api",LoadMore);
app.use("/api",SearchProduct);
app.use("/api",SimilarProduct);
app.use("/api",CategoryWiseProduct);

// Payments router
app.use("/api",BrainTree);
app.use("/api",Payments);

// order router
app.use("/api",Orders);
app.use("/api",AllOrders);
app.use("/api",OrderStatus);


// rest api
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// port
const PORT = process.env.PORT || 8000;

// listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

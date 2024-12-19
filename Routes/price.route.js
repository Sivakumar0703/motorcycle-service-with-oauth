import express from "express";
import { getPrice, setPrice, updatePrice } from "../Controllers/price.controller.js";

const priceRouter = express.Router();

priceRouter.get('/',getPrice);
priceRouter.post('/allotPrice',setPrice );
priceRouter.put('/update/:id',updatePrice);

export default priceRouter
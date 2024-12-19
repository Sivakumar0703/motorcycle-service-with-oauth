import express from "express";
import { addBike, deleteBike, getBike } from "../Controllers/bike.controller.js";

const bikeRouter = express.Router();

bikeRouter.get("/", getBike);
bikeRouter.post("/addbike", addBike);
bikeRouter.delete("/delete/:id", deleteBike);

export default bikeRouter

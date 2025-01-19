import { Router } from "express";
import { createOrder, getOrders, updateStatus } from "../controllers/orders.controller.js";

const router = Router();

// Add your routes here
router.route("/createorder").post(createOrder); // for customer 
router.route("/getorders").get(getOrders); // for ownner
router.route("/:id/updatestatus").patch(updateStatus) // for ownner

export default router;

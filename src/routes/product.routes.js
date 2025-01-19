import {Router} from "express";
import { addProduct, deleteProduct, editProduct, getAllProducts } from "../controllers/product.controllers.js";

const router = Router()

router.route("/addproduct").post(addProduct) // for ownner
router.route("/getitems").get(getAllProducts) // for customer and ownner
router.route("/:id/editprice").patch(editProduct) // for ownner
router.route("/:id/deleteitem").delete(deleteProduct) // for ownner

export default router;
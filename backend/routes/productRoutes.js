import express from "express"
import { countAllProducts, createProduct, deleteAllProducts, deleteOneProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController.js"
import { adminAuth } from "../middlewares/verification.js"

const productRouter = express.Router()

// Product Routes
productRouter.post("/createProduct", createProduct)
productRouter.put("/update/:id", adminAuth, updateProduct)
productRouter.get("/:id", getOneProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/count/allProducts", adminAuth, countAllProducts)
productRouter.delete("/:id", adminAuth, deleteOneProduct)
productRouter.delete("/", adminAuth, deleteAllProducts)

// Export Router
export default productRouter;
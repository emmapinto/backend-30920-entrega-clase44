import { Router } from "express";
import { returnTestProducts, returnProducts, createProduct, editProduct, deleteProduct } from "../controladores/products.js";

const router = Router()

router.get('/productos-test', returnTestProducts)
router.get('/:id?', returnProducts)
router.post('/', createProduct)
router.put('/:id', editProduct)
router.delete('/:id', deleteProduct)

export default router
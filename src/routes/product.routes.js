import { Router } from "express";
import { uploader } from "../uploader.js";
import ProductManager from "../productManager.js";
import config from "../config.js";

const productRoutes = Router();

const productJson = './src/product.json'
const manager = new ProductManager(productJson);

productRoutes.get('/',async (req,res)=>{
    const limit = parseInt(req.query.limit) || 0;
    const products = await manager.getProducts(limit)
    res.status(200).send({ status: 1, payload: products})
})

productRoutes.get('/:pid', async(req,res) => {
    const productId = parseInt(req.params.pid);
    const product = await manager.getProductsById(productId)
    res.status(200).send({ status: 2, payload: product})
})

productRoutes.post('/', uploader.single('thumbnail'), async(req,res) => {
    console.log(req.file);
    console.log(req.body);
    const title = req.body.title;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    const thumbnail = `${config.DIRNAME}public/img/${req.file.originalname}`
    const code = req.body.code;
    const stock = parseInt(req.body.stock);
    // console.log(`${config.DIRNAME}public/img/${req.file.originalname}`)
    await manager.addProduct(title, description, price, thumbnail,code,stock);
    res.status(200).send({ status:3, payload: req.body });
})

productRoutes.delete('/:pid',async(req,res) => {
    const productId = parseInt(req.params.pid);
    const deleteProduct = await manager.deleteProductId(productId)
    res.status(200).send({ status: 4, payload: deleteProduct})
})

productRoutes.put('/:id', uploader.single('thumbnail'),async(req,res) => {
    const productId = parseInt(req.params.id);
    const update = req.body
    update.id = productId
    await manager.updateProduct(update)
    res.status(200).send({ status: 5, payload: update})
})


export default productRoutes;
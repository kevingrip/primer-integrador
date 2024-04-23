import { Router } from "express";
import { uploader } from "../uploader.js";
import CartManager from "../cartManager.js";

const cartRoutes = Router();

const cartJson = './src/carts.json'
const cManager = new CartManager(cartJson);

cartRoutes.get('/',async (req,res)=>{
    const limit = parseInt(req.query.limit) || 0;
    const products = await cManager.getCart(limit)
    res.status(200).send({ status: 1, payload: products})
})

cartRoutes.get('/:cid', async(req,res) => {
    const productId = parseInt(req.params.cid);
    if (productId <= 0 || isNaN(productId)) {
        res.status(400).send({ status: 0, payload: [], error: 'Se requiere id numérico mayor a 0' });
    }else{
        const product = await cManager.getCartId(productId)
        res.status(200).send({ status: 2, payload: product})
    }
    
})

cartRoutes.post('/', uploader.single(), async(req,res) => {
    console.log(req.body);
    const cartEmpty = await cManager.newCartEmpty();
    res.status(200).send({ status:3, payload: cartEmpty });
})

cartRoutes.post('/:cid/product/:pid', uploader.single(), async(req,res) => {
    // console.log(req.body);
    const cartId = parseInt(req.params.cid);
    const prodId = parseInt(req.params.pid);
    if ((prodId <= 0 || isNaN(prodId))||(cartId <= 0 || isNaN(cartId))) {
        res.status(400).send({ status: 0, payload: [], error: 'Se requiere id numérico mayor a 0' });
    }else{
        const addProd = await cManager.addProductCart(cartId,prodId);
        res.status(200).send({ status:4, payload: addProd });
    }
})

export default cartRoutes;
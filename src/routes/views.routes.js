import { Router } from "express";
import ProductManager from "../dao/productManager.js";
import ProductCollectionManager from "../dao/ProductManagerMdb.js";

const viewsRouter = Router();

const productJson = './src/product.json'
const manager = new ProductManager(productJson);
const dbManager = new ProductCollectionManager()

viewsRouter.get('/bienvenida', (req,res)=>{
    const user = {name: 'Prueba'};
    res.render('index', user)
})


viewsRouter.get('/realtimeproducts',async (req,res)=>{
    const products = await dbManager.getAllProductsDB()
    res.render('realTimeProducts', {products})
})

viewsRouter.post('/realtimeproducts',async (req,res)=>{
    const products = await dbManager.getAllProductsDB()
    res.render('realTimeProducts', {products})
})

viewsRouter.get('/home',async (req,res)=>{
    const products = await manager.getProducts()
    res.render('home', {products})
})

viewsRouter.get('/chat',(req,res)=>{
    res.render('chat',{})
});



export default viewsRouter;
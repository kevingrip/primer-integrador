import { Router } from "express";
import ProductManager from "../productManager.js";


const viewsRouter = Router();

const productJson = './src/product.json'
const manager = new ProductManager(productJson);

viewsRouter.get('/bienvenida', (req,res)=>{
    const user = {name: 'Prueba'};
    res.render('index', user)
})


viewsRouter.get('/realtimeproducts',async (req,res)=>{
    const products = await manager.getProducts()
    res.render('realTimeProducts', {products})
})

viewsRouter.post('/realtimeproducts',async (req,res)=>{
    const products = await manager.getProducts()
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
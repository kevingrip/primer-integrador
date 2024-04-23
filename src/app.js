//instalar express : npm i express

import express from 'express';
import config from './config.js';
import router from './routes/users.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/users',router);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/static',express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, ()=>{
    console.log(`Servidor activo en puerto ${config.PORT}`);
    console.log(config.DIRNAME)
});
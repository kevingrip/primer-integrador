import productModel from "../dao/models/product.model.js";
class CollectionManager {
    constructor() {
    }

    getAllProductsDb = async (limit) => {
        try {
            const products = await productModel.find()
            return limit === 0 ? products : products.slice(0,limit);
            //corregir limit
        } catch (err) {
            return err.message;
        };
    };

    addProductDb = async (title,description,price,thumbnail,code,stock) => {
        try {

            const product = {
                title,description,price,thumbnail,code,stock
            }
    
            if (title && description && price && thumbnail && code && stock){
    
                product.status = true;

                const codes = await productModel.find({}, 'code');

                const productCodes = codes.map(prod =>prod.code);
    
                if (!productCodes.includes(code)){
                    if (codes.length === 0){
                        product.id=1;
                    }else{
                        let mayorProdId=1;
                        codes.forEach(product=>{
                            
                            if (product.id>mayorProdId){
                                mayorProdId=product.id;
                            }                        
                        })
                        product.id=mayorProdId+1;                    
                    }
                    
                    await productModel.create(product);
                    console.log("Producto agregado",code)
                }
                else{
                    console.log("El codigo ya esta agregado",code)
                }
            }     

            
        } catch (err) {
            return err.message;
        };
    };

    getProductByIdDb = async (id) => {
        try {
            return await productModel.findById(id);
        } catch (err) {
            return err.message;
        };
    };

    update = async (id, updProd) => {
        try {
        } catch (err) {
            return err.message;
        };
    };

    deleteProductDB = async (idDelete) => {
        try {
            console.log("Producto eliminado id:",idDelete)
            return await productModel.findByIdAndDelete(idDelete)
        } catch (err) {
            return err.message;
        };
    };
}

export default CollectionManager;
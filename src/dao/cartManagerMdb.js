import cartModel from "../dao/models/cart.model.js";

class CartCollectionManager {
    constructor() {
    }

    getAllCart = async (limit) => {
        try {
            return await cartModel.find()
        } catch (err) {
            return err.message;
        };
    };

    addEmptyCart = async () => {
        try {
            const cart = await cartModel.find()

            const newCart = {            
            };

            
            if (cart.length === 0){
                newCart.idCart=1;
            }else{
                let mayorProdId=1;
                cart.forEach(product=>{
                    
                    if (product.idCart>mayorProdId){
                        mayorProdId=product.idCart;
                    }                        
                })
                newCart.idCart=mayorProdId+1;
            }
            newCart.list=[];

            await cartModel.create(newCart)
            console.log("Carrito agregado")
            return newCart
        } catch (err) {
            return err.message;
        };
    };

    addProductCart = async (cartId,productId) => {
        try {
            const cartProduct = await cartModel.findById(cartId)

            console.log(productId)

            if (cartProduct){

                const prodList = cartProduct.list

                const prodFilter = prodList.filter(prod => prod.idProduct === productId)

                console.log(prodFilter)

                console.log('prodFilter',prodFilter)

                if (prodFilter.length>0){
                    prodList.forEach(cart =>{ 
                        if (cart.idProduct === productId){
                            cart.quantity+=1;
                        }})
                } else {
                    cartProduct.list.push({'idProduct':productId, 'quantity':1})
                }
                
                await cartModel.findByIdAndUpdate(cartId, cartProduct);
                return (cartProduct)
            }else{
                return "Carrito no encontrado"
            }
            
            

        } catch (err) {
            return err.message;
        };
    };

    getCartById = async (id) => {
        try {
            return await cartModel.findById(id)
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

    delete = async (idDelete) => {
        try {
        } catch (err) {
            return err.message;
        };
    };
}

export default CartCollectionManager;
import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'carts'; 

const schema = new mongoose.Schema({

    idCart: { type: Number, required: true },
    list: [{idProduct:{type: Number, required: true},quantity:{ type: Number, required: true }}]

    
},{ versionKey: false });

const cartModel = mongoose.model(collection, schema); 

export default cartModel;
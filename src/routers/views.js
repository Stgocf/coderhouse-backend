import { Router } from "express";
import  ProductManager  from '../productManager.js';
import { productModel } from "../models/products.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    //const prodM = new ProductManager();
    //const products = prodM.getProducts();
    const products = await productModel.find().lean();
    return res.render('home', { products , styles:'styles.css'});
});

viewsRouter.get('/realTimeProducts', (req, res) => {
    return res.render('realTimeProducts', { styles:'styles.css'});
});

viewsRouter.get('/chat', (req, res) => {
    return res.render('chat', { styles:'styles.css'});
});

export default viewsRouter; 
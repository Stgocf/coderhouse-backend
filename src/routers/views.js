import { Router } from "express";
import  ProductManager  from '../productManager.js';

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    const prodM = new ProductManager();
    const products = prodM.getProducts();
    return res.render('home', { products , styles:'styles.css'});
});

viewsRouter.get('/realTimeProducts', (req, res) => {
    return res.render('realTimeProducts', { styles:'styles.css'});
});

export default viewsRouter; 
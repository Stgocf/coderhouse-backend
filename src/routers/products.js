import { Router } from "express";
import  ProductManager  from '../productManager.js';

const productsRouter = Router();

// get on route "/"
productsRouter.get('/', (req, res) => {
    let pm = new ProductManager();
    let products = pm.getProducts();
    let {limit} = req.query;
    limit = Number(limit)
    if(limit && limit > 0){
        //si limitt existe, filtrar productos por los primeros limit elementos
        products = products.slice(0, limit);
    }
    return res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
    let pm = new ProductManager();
    //verify if pid is number
    if(isNaN(req.params.pid)){
        return res.status(400).send("Invalid product id");
    }
    let product = pm.getProductById(Number(req.params.pid));
    if(product){
        return res.json(product);
    }
    else{
        return res.status(404).send("Product not found");
    }
});

productsRouter.post('/', (req, res) => {
    let pm = new ProductManager();
    let {title, price, description, thumbnails=[], code, stock, category} = req.body;
    let result = pm.addProduct(title, price, description, thumbnails, code, stock, category );
    if(result === "Product code already exists"){
        return res.status(400).send(result);
    }
    else if(result){
        return res.status(400).send(result);
    }
    else{
        return res.status(201).send("Product created");
    }
});

productsRouter.put('/:pid', (req, res) => {
    let pm = new ProductManager();
    let result = pm.updateProduct(Number(req.params.pid), req.body);
    if(result === "Product not found"){
        return res.status(404).send(result);
    }
    else if(result){
        return res.status(400).send(result);
    }
    else{
        return res.status(200).send("Product updated");
    }
});

productsRouter.delete('/:pid', (req, res) => {
    let pm = new ProductManager();
    let result = pm.deleteProduct(Number(req.params.pid));
    if(result === "Product not found"){
        return res.status(404).send(result);
    }
    else{
        return res.status(200).send("Product deleted");
    }
});


export default productsRouter;
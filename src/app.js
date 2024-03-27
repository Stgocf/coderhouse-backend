// Import express
import express from 'express';
import ProductManager from '../productManager.js';

// Import routes
//const routes = require('./routes');

//define PORT 
const PORT = 3000;

// Create an express app
const app = express();


// get on route "/"
app.get('/', (req, res) => {
    res.send('Hello World');
});

// get on route "/"
app.get('/products', (req, res) => {
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

app.get('/products/:pid', (req, res) => {
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

// app lise on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Use the routes
//app.use('/', routes);

// Export the app
//module.exports = app;


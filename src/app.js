// Import express
import express from 'express';
import productsRouter from './routers/products.js';
import cartsRouter from './routers/carts.js';

// Import routes
//const routes = require('./routes');

//define PORT 
const PORT = 8080;
// Create an express app
const app = express();

//classic configs for app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use productsRouter on /api/products
app.use('/api/products', productsRouter);
//use cartsRouter on /api/carts
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    // send Hello World
    res.send('Hello World');
});

// app lise on port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Use the routes
//app.use('/', routes);

// Export the app
//module.exports = app;


// Import express
import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';

import productsRouter from './routers/products.js';
import cartsRouter from './routers/carts.js';
import viewsRouter from './routers/views.js';
import __dirname from './utils.js';

import  ProductManager  from './productManager.js';
//create a new instance of ProductManager
const prodM = new ProductManager();

//print __dirname to check the path
console.log(__dirname)

//define PORT 
const PORT = 8080;
// Create an express app
const app = express();

//classic configs for app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set middleware for static files
app.use(express.static(__dirname + '/public'));

//set engine for handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//use productsRouter on /api/products
app.use('/api/products', productsRouter);
//use cartsRouter on /api/carts
app.use('/api/carts', cartsRouter);
//use viewsRouter on /
app.use('/', viewsRouter);

// app lise on port 
const serverExpress = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

//socket.io
const socketServer = new Server(serverExpress);
socketServer.on('connection', (socket) => {
    //to check the connection
    console.log('new connection', socket.id);

    //to view products in real time
    socket.emit('products', prodM.getProducts());

    //to add product
    socket.on('newproduct', (product) => {
        console.log('recieved newproduct event');
        prodM.addProduct(product.title, 
                        product.price, 
                        product.description, 
                        [],
                        product.code, 
                        product.stock, 
                        product.category);
        socket.emit('products', prodM.getProducts());
    });
   
});

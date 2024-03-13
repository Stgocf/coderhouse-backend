import ProductManager from './productManager.js';

//check getProducts
let pm = new ProductManager();
console.log(pm.getProducts());

//check addProduct
pm.addProduct("name", 100, "description", "thumbnail", "code", 10);
console.log(pm.getProducts());
//try to add product with same code
console.log(pm.addProduct("name", 100, "description", "thumbnail", "code", 10));
//try to add product without one parameter
console.log(pm.addProduct("name", 100, "description", "thumbnail", "code2"));

//add another product
pm.addProduct("name2", 200, "description2", "thumbnail2", "code2", 20);
console.log(pm.getProducts());

//test getProductById   
console.log(pm.getProductById(1));
console.log(pm.getProductById(2));
console.log(pm.getProductById(3));
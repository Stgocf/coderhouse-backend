import ProductManager from './productManager.js';

//check getProducts
console.log("First Test: getProducts ------------------------------");
let pm = new ProductManager();
console.log(pm.getProducts());

//check addProduct
console.log("Second Test: addProduct ------------------------------");
pm.addProduct("name1", 100, "description1", "thumbnail1", "code", 10);
console.log(pm.getProducts());

//try to add product with same code
console.log("Third Test: addProduct with same code ------------------------------")
console.log(pm.addProduct("name", 100, "description", "thumbnail", "code", 10));
//try to add product without one parameter
console.log("Fourth Test: addProduct without one parameter ------------------------------")
console.log(pm.addProduct("name", 100, "description", "thumbnail", "code2"));

//add another product
console.log("Fifth Test: add another product ------------------------------")
pm.addProduct("name2", 200, "description2", "thumbnail2", "code2", 20);
console.log(pm.getProducts());

//test getProductById
console.log("Sixth Test: getProductById ------------------------------") 
console.log(pm.getProductById(1));
console.log(pm.getProductById(2));
console.log(pm.getProductById(3));

//test deleteProduct
console.log("Seventh Test: deleteProduct ------------------------------")
pm.deleteProduct(7);
console.log(pm.getProductById(7));

//test updateProduct
console.log("Eighth Test: updateProduct ------------------------------ ")
pm.updateProduct(6, {title: 'updated title and stock', stock: 20});
console.log(pm.getProductById(6));
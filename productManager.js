import Product from './product.js';
import fs from 'fs';

class ProductManager{
    static productId = 1;

    constructor(){
        this.path = './files/products.json';
        this.products = this.readProducts();
    }
    
    //read products in file products.json
    readProducts(){
        try{
            //check if file exists
            if(fs.existsSync(this.path )){
                let jsonProducts = fs.readFileSync(this.path , 'utf-8');
                jsonProducts = JSON.parse(jsonProducts);
                //create products from json usin mps
                let productsArray = jsonProducts.map(product => new Product(product.id, product.title, product.price, product.description, product.thumbnail, product.code, product.stock));
                //set productId to the max id in productsArray
                let maxId = Math.max(...productsArray.map(product => product.id));
                ProductManager.productId = maxId + 1;
                return productsArray;
            }
            else{
                console.log("file don't exists");
                return [];
            }
        }
        catch(e){  
            console.log("Error reading products.json");
            console.log(e);
            return [];
        }
    }

    //write products in file products.json
    writeProducts(){
        try{
            //transform products array to json

            fs.writeFileSync(this.path , JSON.stringify(this.products, null, 2), 'utf-8');
        }
        catch(e){
            console.log("Error writing products.json");
            console.log(e);
        }
    }

    addProduct(name, price, description, thumbnail, code, stock){
        //seacrh for product with same code
        let prod = this.getProductByCode(code);
        if(prod){
            return "Product code already exists";
        }
        //create new product
        
        try{
            let newProduct = new Product(ProductManager.productId, name, price, description, thumbnail, code, stock);
            this.products.push(newProduct);
            this.writeProducts();
            ProductManager.productId++;
        }
        catch(e){
            return e.message;
        }
    }
    getProducts(){
        return this.products;
    }
    getProductById(productId){
        let prod = this.products.find(product => product.id === productId);
        if(prod){
            return prod;
        }
        else{
            console.log("Product not found");
            return null;
        }
    }
    deleteProduct(productID){
        let products = this.products.findIndex(product => product.id === productID);
        if(products !== -1){
            this.products = this.products.filter(product => product.id !== productID);
            this.writeProducts();
            console.log("Product deleted");
        }
        else{
            console.log("Product not found");
        }
    }
    getProductByCode(productCode){
        return this.products.find(product => product.code === productCode);
    }
    updateProduct(productId, propsToUpdate){
        //let product = this.getProductById(productId);
        let prodIdex = this.products.findIndex(product => product.id === productId);
        if(prodIdex === -1){
            console.log("Product not found");
            return;
        }
        else{
            let product = this.products[prodIdex];
            for(let prop in propsToUpdate){
                if(product[prop] !== undefined){
                    product[prop] = propsToUpdate[prop];
                }
                else{
                    console.log("Property not found: " + prop);
                }
            }
            this.products[prodIdex] = product;
            this.writeProducts();
            console.log("Product updated");
        }
        
    }
}

export default ProductManager;

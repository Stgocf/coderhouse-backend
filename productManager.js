import Product from './product.js';

class ProductManager{
    static productId = 1;
    

    constructor(){
        this.products = [];
    }
    addProduct(name, price, description, thumbnail, code, stock){
        //seacrh for product with same code
        let prod = this.getProductByCode(code);
        if(prod){
            return "Product already exists";
        }
        //create new product
        
        try{
            let newProduct = new Product(ProductManager.productId, name, price, description, thumbnail, code, stock);
            this.products.push(newProduct);
            ProductManager.productId++;
        }
        catch(e){
            return e.message;
        }
    }
    removeProduct(productID){
        this.products = this.products.filter(product => product.id !== productID);
    }
    getProducts(){
        return this.products;
    }
    getProductByName(productName){
        return this.products.find(product => product.name === productName);
    }
    getProductByCode(productCode){
        return this.products.find(product => product.code === productCode);
    }
    getProductById(productId){
        let prod = this.products.find(product => product.id === productId);
        if(prod){
            return prod;
        }
        else{
            return "Product not found";
        }
    }
    updateProduct(productName, newProduct){
        this.products = this.products.map(product => {
            if(product.name === productName){
                return newProduct;
            }
            return product;
        });
    }
}

export default ProductManager;

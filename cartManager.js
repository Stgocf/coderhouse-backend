//use cartManager.js to manage cart
import Cart from './cart.js';
import fs from 'fs';
import ProductManager from './productManager.js';

//class to manage cart
class CartManager{
    static cartId = 1;

    constructor(){
        this.path = './files/carts.json';
        this.carts = this.readCarts();
    }
    
    //read carts in file carts.json
    readCarts(){
        try{
            //check if file exists
            if(fs.existsSync(this.path )){
                let jsonCarts = fs.readFileSync(this.path , 'utf-8');
                jsonCarts = JSON.parse(jsonCarts);
                //create carts from json using mps
                let cartsArray = jsonCarts.map(cart => new Cart(cart.id, cart.products));
                //set cartId to the max id in cartsArray
                let maxId = Math.max(...cartsArray.map(cart => cart.id));
                CartManager.cartId = maxId + 1;
                return cartsArray;
            }
            else{
                console.log("file don't exists");
                return [];
            }
        }
        catch(e){  
            console.log("Error reading carts.json");
            console.log(e);
            return [];
        }
    }

    //write carts in file carts.json
    writeCarts(){
        try{
            //transform carts array to json
            fs.writeFileSync(this.path , JSON.stringify(this.carts, null, 2), 'utf-8');
        }
        catch(e){
            console.log("Error writing carts.json");
            console.log(e);
        }
    }

    addCart(products = []){
        //create new cart
        let newCart = new Cart(CartManager.cartId, products);
        //add new cart to carts array
        this.carts.push(newCart);
        //write carts to file
        this.writeCarts();
        CartManager.cartId++;
        return newCart;
    }

    getCartById(id){
        //search for cart with same id
        console.log("carts: ", this.carts);
        let cart = this.carts.find(cart => Number(cart.id) === Number(id));
        if (cart){
            return cart;
        }
        else{
            console.log("Cart not found");
            return null;
        }
    }

    deleteCartById(id){
        //search for cart with same id
        let index = this.carts.findIndex(cart => cart.id === id);
        //if cart exists, delete it
        if(index !== -1){
            this.carts.splice(index, 1);
            this.writeCarts();
            return true;
        }
        return false;
    }

    addProductToCart(id, productId){
        //search for cart with same id
        let cart = this.carts.find( cart => Number(cart.id) === Number(id)); 
        //if cart exists, add product to cart
        if(cart){
            //search for the product with the same id
            let prodtManager = new ProductManager();
            let product = prodtManager.getProductById(productId);
            if(product){
                //add product to cart products array
                let index = cart.products.findIndex(product => Number(product.id) === Number(productId));
                if(index !== -1){
                    cart.products[index].quantity++;
                }
                else{
                    cart.products.push({id: productId, quantity: 1});
                }
                this.writeCarts();
                return true;
            }

        }
        return false;
    }

    removeProductFromCart(id, productId){
        //search for cart with same id
        let cart = this.carts.find(
            cart => cart.id === id
        ); 
        //if cart exists, remove product from cart
        if(cart){
            let index = cart.products.findIndex(
                product => product.id === productId
            );
            if(index !== -1){
                cart.products.splice(index, 1);
                this.writeCarts();
                return true;
            }
        }
        return false;
    }
}

export default CartManager;
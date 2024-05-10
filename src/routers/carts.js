import { Router } from "express";
//import  CartManager  from "../cartManager.js";
//import  ProductManager  from "../productManager.js";
import { addCart, addProductToCart, getCartById, deleteProductFromCart, updateCart, updateCartProduct, deleteAllProductsFromCart} from "../controllers/carts.js";


const cartsRouter = Router();

cartsRouter.post("/", addCart );
cartsRouter.get("/:cid", getCartById );
cartsRouter.post("/:cid/product/:pid", addProductToCart );
cartsRouter.delete("/:cid/products/:pid", deleteProductFromCart)
cartsRouter.put("/:cid", updateCart)
cartsRouter.put("/:cid/products/:pid", updateCartProduct)
cartsRouter.delete("/:cid", deleteAllProductsFromCart)

// cartsRouter.post("/", (req, res) => {
//     //new cartManager
//     let cartManager = new CartManager();
//     //create a new cart
//     let cart = cartManager.addCart();
//     res.json(cart);
// });

// cartsRouter.get("/:cid", (req, res) => {
//     //new cartManager
//     let cartManager = new CartManager();
//     //return the cart with the id from the request
//     let cart = cartManager.getCartById(req.params.cid);
//     res.json(cart);

// });

// cartsRouter.post("/:cid/product/:pid", (req, res) => {
//     //new cartManager
//     let cartManager = new CartManager();
//     //new productManager
//     let productManager = new ProductManager();

//     //get the cart with the id from the request, return an error if dont exists
//     let cart = cartManager.getCartById(req.params.cid);
//     if(!cart){
//         res.status(404).json({error: "Cart not found"});
//     }

//     //get the product with the id from the request
//     let product = productManager.getProductById(req.params.pid);
//     //add the product to the cart if the product exists, else return an error
//     if(product){
//         cartManager.addProductToCart(req.params.cid, req.params.pid);
//         res.json(cart);
//     }
//     else{
//         res.status(404).json({error: "Product not found"});
//     }

// });

export default cartsRouter;
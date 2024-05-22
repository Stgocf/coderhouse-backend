import { Router } from "express";
//import  ProductManager  from '../productManager.js';
//import { productModel } from "../models/products.js";
import { cartModel } from "../models/carts.js";
import { getProducts } from "../controllers/products.js";
import { auth } from "../middlewares/auth.js";

const viewsRouter = Router();

// viewsRouter.get('/', async (req, res) => {
//     //const prodM = new ProductManager();
//     //const products = prodM.getProducts();
//     const products = await productModel.find().lean();
//     return res.render('home', { products , styles:'styles.css'});
// });

viewsRouter.get('/', auth, async (req, res) => {
    return res.render('login', { styles:'styles.css'});
});

viewsRouter.get('/login', auth, async (req, res) => {
    return res.render('login', { styles:'styles.css'});
});

viewsRouter.get('/profile', auth, async (req, res) => {
    return res.render('profile', { user: req.session.user, styles:'styles.css'});
});

viewsRouter.get('/register', auth, async (req, res) => {
    return res.render('register', { styles:'styles.css'});
});

viewsRouter.get('/realTimeProducts', (req, res) => {
    return res.render('realTimeProducts', { styles:'styles.css'});
});

viewsRouter.get('/chat', (req, res) => {
    return res.render('chat', { styles:'styles.css'});
});

viewsRouter.get('/products', auth,  async (req, res) => {
    const products = await getProducts(req, res);
    console.log(products);
    return res.render('products', { user: req.session.user, products, styles:'styles.css'});
});

viewsRouter.get('/carts/:cid', async (req, res) => {
    const cart = await cartModel.findById(req.params.cid).lean().populate('products.id', 'title description price thumbnail code stock category status');
    if (cart) {
        // Map through products and flatten the structure
        const productsWithDetails = cart.products.map(product => {
            return {
                id: product.id._id,
                title: product.id.title,
                description: product.id.description,
                price: product.id.price,
                thumbnail: product.id.thumbnail,
                code: product.id.code,
                stock: product.id.stock,
                category: product.id.category,
                status: product.id.status,
                qty: product.qty
            };
        });

        // Replace products array with flattened structure
        cart.products = productsWithDetails;
        return res.render('cart', { cart,  styles:'styles.css'}) 
        }
    else {
        return res.status(404).send("getCartById -> Cart not found");
    }
}
);


export default viewsRouter; 
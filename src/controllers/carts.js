import { request, response } from "express";
import {cartModel} from "../models/carts.js";
import {productModel} from "../models/products.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid).lean().populate('products.id', 'title description price thumbnail code stock category status');;
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

            return res.json(cart);
        } else {
            return res.status(404).send("getCartById -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "getCartById -> Internal server error" });
    }
}

export const addCart = async (req = request, res = response) => {
    try {
        const cart = await cartModel.create({});
        return res.json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "addCart -> Internal server error" });
    }
}

export const addProductToCart = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
            const product = await productModel.findById(req.params.pid);
            if (!product) {
                return res.status(404).send("addProductToCart -> Product not found");
            }
            const productInCart = cart.products.find(p => p.id == req.params.pid);
            if (productInCart) {
                productInCart.qty++;
                cart.save();
            } else {
                cart.products.push({ id: req.params.pid, qty: 1 });
                cart.save();
            }
            return res.send("addProductToCart -> Product added to cart");
        } else {
            return res.status(404).send("addProductToCart -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "addProductToCart -> Internal server error" });
    }
}

export const deleteProductFromCart = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
            const productInCart = cart.products.find(p => p.id == req.params.pid);
            if (productInCart) {
                cart.products = cart.products.filter(p => p.id != req.params.pid);
                cart.save();
                return res.status(200).send("deleteProductFromCart -> Product deleted from cart");
            } else {
                return res.status(404).send("deleteProductFromCart -> Product not found in cart");
            }
        } else {
            return res.status(404).send("deleteProductFromCart -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "deleteProductFromCart -> Internal server error" });
    }
}

export const updateCart = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
            cart.products = req.body.products;
            cart.save();
            return res.send("updateCart -> Cart updated");
        } else {
            return res.status(404).send("updateCart -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "updateCart -> Internal server error" });
    }
}

export const updateCartProduct = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
            const productInCart = cart.products.find(p => p.id == req.params.pid);
            if (productInCart) {
                productInCart.qty = req.body.qty;
                cart.save();
                return res.send("updateCartProduct -> Product updated in cart");
            } else {
                return res.status(404).send("updateCartProduct -> Product not found in cart");
            }
        } else {
            return res.status(404).send("updateCartProduct -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "updateCartProduct -> Internal server error" });
    }
}

export const deleteAllProductsFromCart = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
            cart.products = [];
            cart.save();
            return res.send("deleteAllProductsFromCart -> All products deleted from cart");
        } else {
            return res.status(404).send("deleteAllProductsFromCart -> Cart not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "deleteAllProductsFromCart -> Internal server error" });
    }
}
import { request, response } from "express";
import {cartModel} from "../models/carts.js";
import {productModel} from "../models/products.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const cart = await cartModel.findById(req.params.cid);
        if (cart) {
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
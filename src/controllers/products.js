import { request, response } from "express";
import { productModel } from "../models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const products = await productModel.find();
        return res.json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "getProducts -> Internal server error" });
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).send("getProductById -> Product not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "getProductById -> Internal server error" });
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, price, description, thumbnails = [], code, stock, category } = req.body;
        //const product = new productModel({ title, price, description, thumbnails, code, stock, category });
        //await product.save();
        const product = await productModel.create({ title, price, description, thumbnails, code, stock, category });
        return res.status(201).send("addProduct -> Product created");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "addProduct -> Internal server error" });
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { _id, ...productData } = req.body;
        const product = await productModel.findByIdAndUpdate(req.params.pid, productData );
        product.save();

        if (product) {
            return res.send("updateProduct -> Product updated");
            
        } else {
            return res.status(404).send("updateProduct -> Product not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "updateProduct -> Internal server error" });
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        if (product) {
            return res.send("deleteProduct -> Product deleted");
        } else {
            return res.status(404).send("deleteProduct -> Product not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "deleteProduct -> Internal server error" });
    }
}
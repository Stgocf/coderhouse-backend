import { request, response } from "express";
import { productModel } from "../models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {

        let { limit = 10, page = 1, sort = '', query = {} } = req.query;
        //parsing queryParams to correct types
        limit = parseInt(limit);
        page = parseInt(page);
        //query = JSON.parse(query);

        //if sort is not asc o desc, then error
        if (sort !== '' && sort !== 'asc' && sort !== 'desc') {
            return res.status(400).send("getProducts -> sort must be 'asc' or 'desc'");
        }

        // Convert sort parameter to 1 for asc and -1 for desc
        if (sort === 'asc') {
            sort = 1;
        } else if (sort === 'desc') {
            sort = -1;
        }

        //apply pagination
        const options = {
            page: page,
            limit: limit,
            lean: true
        }
        //add sort in options only if it not empty
        if (sort !== '') {
            options.sort = { _id: sort };
        }

        // Using mongoose-paginate-v2's paginate method with query
        const result = await productModel.paginate(query, options);

        // Constructing pagination links
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null;
        const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null;

        // Constructing the response
        const responsePayload = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        };

        //return res.json(responsePayload);
        if (!req.originalUrl.startsWith('/api')) {
            return responsePayload;
        } else {
            return res.json(responsePayload);
        }

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